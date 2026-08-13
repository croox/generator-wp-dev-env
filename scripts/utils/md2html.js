const fs = require('fs-extra');
const path = require('path');
const showdown = require('showdown');
const showdownHighlight = require('showdown-highlight');

const extReg = /([.]md)|([.]markdown)/;

const md2html = (typesDir, htmlDir) => {
	// Directories must be types: https://kapeli.com/docsets#supportedentrytypes
	const types = fs.readdirSync(typesDir);

	fs.ensureDirSync(htmlDir);

	// Init converter, showdown flavor github
	showdown.setFlavor('github');
	const converter = new showdown.Converter({
		extensions: [showdownHighlight],
	});

	[...types].forEach((type) => {
		const markdowns = fs.readdirSync(path.join(typesDir, type));
		[...markdowns].forEach((md) => {
			const ext = path.extname(md);
			if (ext !== '.md' && ext !== '.markdown') return;

			// Read markdown file
			const mdData = fs.readFileSync(path.join(typesDir, type, md), {
				encoding: 'utf8',
			});
			// Convert to html
			const mdHtml = converter.makeHtml(mdData);

			// Set paths
			const typePath = path.join(htmlDir, type);
			const htmlPath = path.join(typePath, md.replace(extReg, '') + '.html');
			fs.ensureDirSync(typePath);

			// Define template
			let template = '{{text}}';
			switch (type) {
				case 'Directory':
					template = require(path.resolve('docs', 'src', 'templates', 'directory.html'));
					break;
				case 'Guide':
				default:
					template = require(path.resolve('docs', 'src', 'templates', 'default.html'));
			}

			// Write to temp HTML file
			fs.writeFileSync(htmlPath, template.replace('{{text}}', mdHtml));
		});
	});
};

module.exports = md2html;
