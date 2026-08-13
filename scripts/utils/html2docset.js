const fs = require('fs-extra');
const path = require('path');

const { DocSetGenerator } = require('docset-generator');

const pkg = require(path.resolve('package.json'));

const extReg = /([.]md)|([.]markdown)/;

const html2docset = (typesDir, htmlDir) =>
	new Promise((resolve) => {
		// Directories must be types: https://kapeli.com/docsets#supportedentrytypes
		const types = fs.readdirSync(typesDir);

		const entries = [];

		[...types].forEach((type) => {
			const mds = fs.readdirSync(path.join(typesDir, type));

			[...mds].forEach((md) => {
				const name = md.replace(extReg, '');
				entries.push({
					name,
					type,
					path: path.join(type, name + '.html'),
				});
			});
		});

		// Create docset use
		const docSetGenerator = new DocSetGenerator({
			destination: path.resolve('docs'),
			name: pkg.name,
			documentation: htmlDir,
			entries,
		});
		docSetGenerator.create().then((res) => resolve(res));
	});

module.exports = html2docset;
