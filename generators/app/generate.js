

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
			dest: 'composer.json',
			data: {
				require: {},
				['require-dev']: {
					['croox/wp-dev-env-frame']: '*',
					['composer/installers']: '*',
				},
				extra: {
					['installer-paths']: {
						['vendor/{$vendor}/{$name}']: [
							"webdevstudios/cmb2",
						],
					},
				},
				repositories: [
					{
						type: 'package',
						package: {
							name: 'croox/wp-dev-env-frame',
							version: '0.0.3',
							source: {
								url: 'https://github.com/croox/wp-dev-env-frame.git',
								type: 'git',
								reference: '0.0.3'
							},
						},
					},
				],
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
					['wp-dev-env-grunt']: 'git+https://github.com/croox/wp-dev-env-grunt.git#0.0.2',
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
		{ src: 'src/_readme.txt',	dest: 'src/readme.txt' },
		...( 'plugin' === tplContext.projectType ? [
			{ src: 'src/_plugin_main_file.php',	dest: 'src/' + tplContext.name + '.php' },
 		] : [] ),
		...( 'theme' === tplContext.projectType ? [
			{ src: 'src/_functions.php',	dest: 'src/functions.php' },
			// ... ???
		] : [] ),
	].map( tpl => self.fs.copyTpl(
		self.templatePath( tpl.src ),
		self.destinationPath( tpl.dest ),
		tplContext
	) );

	// copy directory structure
	copyDirStructure( self, null, {
		...( 'plugin' === tplContext.projectType && { exclude: ['src/templates'] } ),
	} );

	// generate json
	generateJson();

	// copy templates
	copyTpls();

	// copy all readme
	self.fs.copyTpl(
		self.templatePath( '**/readme.md' ),
		self.destinationPath(),
		tplContext
	);

};

module.exports = generate;
