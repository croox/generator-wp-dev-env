const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const compressing = require('compressing');
const DocBlock = require('docblock');
const { get, uniq, dropWhile } = require('lodash');

const pkg = require(path.resolve('package.json'));
const md2html = require('./utils/md2html');
const html2docset = require('./utils/html2docset');
const buildTree = require('./utils/buildTree');

// Copies all readme.md from templates to tmp
const copyReadmesDirectory = () => {
	const sourceDir = path.resolve('generators', 'app', 'templates');

	const files = glob.sync(['**/readme.md', '!**/*~', '!**/*#'], {
		cwd: sourceDir,
	});

	[...files].forEach((file) => {
		const newFileName = file.replace(/\/readme/g, '').replace(/\//g, '___');
		fs.copySync(
			path.resolve(sourceDir, file),
			path.resolve('tmp', 'docs', 'types', 'Section', newFileName)
		);
	});
};

// Copies all readme.md from docs/src/types to tmp
const copyReadmesDocsSrc = () => {
	const sourceDir = path.resolve('docs', 'src', 'types');

	const files = glob.sync(['**/*.md', '!**/*~', '!**/*#'], {
		cwd: sourceDir,
	});

	[...files].forEach((file) => {
		fs.copySync(path.resolve(sourceDir, file), path.resolve('tmp', 'docs', 'types', file));
	});
};

const getDirTree = () => {
	const sourceDir = path.resolve('generators', 'app', 'templates');

	const files = uniq([
		'root/',
		...glob
			.sync(['**/readme.md', '!**/*~', '!**/*#'], {
				cwd: sourceDir,
			})
			.map((file) => file.replace('readme.md', ''))
			.map((file) => 'root/' + file),
	]);

	let text = '\n';

	const loopTree = (tree, i, lasts) => {
		const loopNode = (node) => {
			Object.entries(node).forEach((entry) => {
				const [key, value] = entry;

				const fileName = [...dropWhile(lasts, (n) => n === 'root'), key].join('___');

				const link =
					key === 'root' ? 'root' : '[' + key + '](../Section/' + fileName + '.html)';

				text += (i > 0 ? '--'.repeat(i) + ' ' : '') + link + '\n';

				loopTree(value, i + 1, [...lasts, key]);
			});
		};

		[...tree].forEach((node) => loopNode(node));
	};

	loopTree(buildTree(files), 0, []);

	return text;
};

const getTaskList = () => {
	const sourceDir = path.resolve('docs', 'src', 'types', 'Command');

	const files = glob.sync(['**/*.md', '!**/*~', '!**/*#'], {
		cwd: sourceDir,
	});

	let text = '\n';

	[...files].forEach((file) => {
		const taskName = file.replace('.md', '');
		const taskDesc = fs
			.readFileSync(path.resolve(sourceDir, file), { encoding: 'utf8' })
			.match(/(>[\s][\s\S]*?\n)([\S][\s\S]*?\n)*/);
		text += '- [' + taskName + '](../Command/' + taskName + '.html)';
		text += taskDesc ? '\n' + taskDesc[0].replace('> ', '') + '\n' : '';
		text += '\n';
	});

	return text;
};

const getHookList = (functionName) => {
	const sourceDir = path.resolve('..', 'wp-dev-env-grunt', 'grunt');

	const files = glob.sync(['**/*.js', '!**/*~', '!**/*#'], {
		cwd: sourceDir,
	});

	let text = '\n';

	if (files.length === 0) {
		console.log('No files found!');
		console.log('"wp-dev-env-grunt" needs to be in same directory like "generator-wp-dev-env"');
	}

	[...files].forEach((file) => {
		// Find hook function and optional above docblock
		const functionRegex = new RegExp(
			String(
				'(\\/\\*\\*[\\r\\n](.|[\\r\\n])*?\\*\\/)?[\\r\\n].*(' +
					functionName +
					'\\()[\\s\\S]*?' +
					(functionName === 'applyFilters' ? ',' : '') +
					(functionName === 'doAction' ? '\\)' : '')
			),
			'g'
		);
		const matches = fs
			.readFileSync(path.resolve(sourceDir, file), { encoding: 'utf8' })
			.match(functionRegex);

		if (matches) {
			[...matches].forEach((match) => {
				// Parse docblock or just store the entire match
				let doc = null;
				if (match.startsWith('/**')) {
					const docBlock = new DocBlock({
						skipMarkdown: true,
					});
					const parsed = docBlock.parse(match, 'js');
					doc = parsed ? parsed[0] : null;
				} else {
					doc = {
						code: match,
					};
				}

				if (doc) {
					let key = '';
					switch (functionName) {
						case 'applyFilters':
							key = doc.code
								.match(/(applyFilters\()[\s\S]*?,/g)[0]
								.replace(/(applyFilters\()[\s]*['"]/, '')
								.replace(/['"],/, '');
							break;
						case 'doAction':
							key = doc.code
								.replace(/[\s\S]*grunt\.hooks\.doAction.*?['"]/, '')
								.replace(/['"][\s\S]*/, '');
							break;
						default:
							break;
					}

					// Start
					text += '- **' + key + '**';

					// Description
					if (get(doc, ['description'], false)) {
						text += '\n' + doc.description.replace('\n', '');
					}

					// Filepath
					text += '\n*File:* ' + path.join('wp-dev-env-grunt', 'grunt', file);

					// Params
					const params = get(doc, ['tags', 'params'], false);
					if (params) {
						text += '\n*Params:* \n';
						[...params].forEach((param) => {
							text +=
								'\n  - *' +
								param.type +
								'*\t' +
								param.name +
								'\t' +
								param.description +
								'\n';
						});
					}

					// End
					text += '\n';
				}
			});
		}
	});

	return text;
};

const replacePatterns = (typesDir) => {
	const files = glob.sync(['**/*.md', '!**/*~', '!**/*#'], {
		cwd: typesDir,
	});

	const options = {
		files: [...files].map((file) => path.resolve(typesDir, file)),
		from: [],
		to: [],
	};

	[
		{
			from: /@include::project_structure_tree/g,
			to: () => getDirTree(),
		},
		{
			from: /@include::task_list/g,
			to: () => getTaskList(),
		},
		{
			from: /@include::filter_list/g,
			to: () => getHookList('applyFilters'),
		},
		{
			from: /@include::action_list/g,
			to: () => getHookList('doAction'),
		},
	].forEach((repl) => {
		options.from.push(repl.from);
		options.to.push(repl.to);
	});

	try {
		replace.sync(options);
	} catch (error) {
		console.error('Error occurred:', error);
	}
};

const compressDocset = () =>
	new Promise((resolve) => {
		const promises = ['tar', 'tgz', 'zip'].map(
			(method) =>
				new Promise((resolve) => {
					compressing[method]
						.compressDir(
							path.resolve('docs', pkg.name + '.docset'),
							path.resolve('docs', pkg.name + '.docset.' + method)
						)
						.then((res) => resolve(res))
						.catch((err) => console.log(err));
				})
		);

		Promise.all(promises).then((res) => resolve(res));
	});

const buildDocs = () => {
	// Ensure empty tmp and docset dirs
	[path.resolve('tmp', 'docs'), path.resolve('docs', pkg.name + '.docset')].forEach((dir) => {
		fs.emptyDirSync(dir);
		fs.ensureDirSync(dir);
	});

	// Get all markdown into tmp/docs/types
	copyReadmesDirectory();
	copyReadmesDocsSrc();

	const typesDir = path.resolve('tmp', 'docs', 'types');
	const htmlDir = path.resolve('tmp', 'docs', 'html');

	replacePatterns(typesDir);

	md2html(typesDir, htmlDir);

	html2docset(typesDir, htmlDir).then(() => {
		compressDocset().then(() => {
			fs.removeSync(path.resolve('tmp', 'docs'));

			console.log('');
			console.log(chalk.green('Created docs, see: '));
			console.log(path.resolve('docs', pkg.name + '.docset'));
			console.log(path.resolve('docs', pkg.name + '.docset.tar'));
			console.log(path.resolve('docs', pkg.name + '.docset.tgz'));
			console.log(path.resolve('docs', pkg.name + '.docset.zip'));
		});
	});
};

buildDocs();
