

const chalk = require('chalk');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');


const generate = ( self, options ) => {

	const { tplContext } = options;

	const generateJson = () => [
		{
			dest: '.eslintrc.json',
			data: {
				parser: 'babel-eslint',
				parserOptions: {
					ecmaVersion: 6,
					sourceType: 'module',
					ecmaFeatures: {
						jsx: true,
						experimentalObjectRestSpread: true,
					},
				},
			},
		},
		{
			dest: 'package.json',
			data: {
				name: tplContext.name,
				displayName: tplContext.displayName,
				funcPrefix:  tplContext.funcPrefix,
				uri: tplContext.uri,
				textDomain: tplContext.textDomain,
				...( tplContext.template && { template: tplContext.template } ),
				domainPath: '/languages',
				version: '0.0.0',
				description: tplContext.description,
				main: 'index.js',
				author: tplContext.author,
				authorUri: tplContext.authorUri,
				projectType: tplContext.projectType,
				contributors: tplContext.author,
				license: 'GNU General Public License v2 or later',
				licenseUri: 'http://www.gnu.org/licenses/gpl-2.0.html',
				tags: tplContext.tags,
				donateLink: tplContext.donateLink,
				repositoryUri: tplContext.repositoryUri,
				wpVersionTested: tplContext.wpVersionTested,
				wpRequiresAtLeast: tplContext.wpRequiresAtLeast,
				phpRequiresAtLeast: tplContext.phpRequiresAtLeast,
				generator: {
					version: tplContext.generator.version,
				},
				scripts: {
					test: 'echo \"Error: no test specified\" && exit 1',
				},
				devDependencies: {
					grunt: '^1.0.3',
					['wp-dev-env-grunt']: 'file:/home/jhotadhari/Development/node/wp-dev-env-grunt',
				},
				['browserify-shim']: {
					jquery: 'global:jQuery',
					react: 'global:React',
					'react-dom': 'global:ReactDOM',
					lodash: 'global:lodash',
				},
			},
		},
		{
			dest: 'wp_installs-sample.json',
			data: {
				mytest: {
					plugins: '/home/' + tplContext.author + '/absPath/to/mytest/wp-content/plugins/',
					themes: '/home/' + tplContext.author + '/absPath/to/mytest/wp-content/themes/'
				},
				myothertest: {
					plugins: '/home/' + tplContext.author + '/absPath/to/myothertest/wp-content/plugins/',
					themes: '/home/' + tplContext.author + '/absPath/to/myothertest/wp-content/themes/'
				},
			},
		},
	].map( obj => self.fs.writeJSON(
		obj.dest,
		obj.data
	) );

	const copyTpls = () => [
		// root
		{ src: '_gitignore',			dest: '.gitignore' },
		{ src: '_Gruntfile.js',			dest: 'Gruntfile.js' },
		{ src: '_README.md',			dest: 'README.md' },
		// src
		{ src: 'src/root_files/_readme.txt',	dest: 'src/root_files/readme.txt' },
		...( 'plugin' === tplContext.projectType ? [
			{ src: 'src/root_files/_plugin_main_file.php',	dest: 'src/root_files/' + tplContext.name + '.php' },
 		] : [] ),
		...( 'theme' === tplContext.projectType ? [
			{ src: 'src/root_files/_functions.php',	dest: 'src/root_files/functions.php' },
			// ... ???
		] : [] ),
	].map( tpl => self.fs.copyTpl(
		self.templatePath( tpl.src ),
		self.destinationPath( tpl.dest ),
		tplContext
	) );

	copyDirStructure( self, null, {
		...( 'plugin' === tplContext.projectType && { exclude: ['src/templates'] } ),
	} );
	generateJson();
	copyTpls();

};

module.exports = generate;
