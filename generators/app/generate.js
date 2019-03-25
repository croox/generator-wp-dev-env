

const chalk = require('chalk');

const {
	startCase,
	kebabCase,
} = require('lodash');

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
					['croox/wp-dev-env-frame']: tplContext.generator.subModules['croox/wp-dev-env-frame'],
					['composer/installers']: '*',
					['dealerdirect/phpcodesniffer-composer-installer']: '0.5.0',
					['wptrt/wpthemereview']: '0.1.0',
				},
				extra: {
					['installer-paths']: {
						['vendor/{$vendor}/{$name}']: [
							"cmb2/cmb2",
						],
					},
				},
				repositories: [
					{
						type: 'vcs',
						url: 'https://github.com/croox/wp-dev-env-frame',
					},
				],
				suggest: {
					['cmb2/cmb2']: 'CMB2 is a metabox, custom fields, and forms library for WordPress that will blow your mind.',
				},
				autoload: {
					['psr-4']: {
						[ tplContext.prefix + '\\']: 'src/classes/',
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
					['wp-dev-env-grunt']: 'git+https://github.com/croox/wp-dev-env-grunt.git#' + tplContext.generator.subModules['wp-dev-env-grunt'],
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
			dest: 'wde_wp_installs-sample.json',
			data: {
				installSlug: {
					plugins: '/home/' + tplContext.author + '/abs_path/to/local_wp/wp-content/plugins/',
					themes: '/home/' + tplContext.author + '/abs_path/to/local_wp/wp-content/themes/',
				},
				otherInstallSlugSilent: {
					plugins: '/home/' + tplContext.author + '/abs_path/to/other/local_wp/wp-content/plugins/',
					themes: '/home/' + tplContext.author + '/abs_path/to/other/local_wp/wp-content/themes/',
					args: [
						"!--verbose",
						"!--stats",
					],
				},
				remoteInstallSlug: {
					plugins: '/home/' + tplContext.author + '/abs_path/to/wp/wp-content/plugins/',
					themes: '/home/' + tplContext.author + '/abs_path/to/wp/wp-content/themes/',
					port: 1234,
					args: [
						"--size-only",
					],
				},
			},
		},
	].map( obj => self.fs.writeJSON(
		obj.dest,
		obj.data
	) );

	const copyBaseTpls = () => [
		// root
		{ src: '_gitignore',			dest: '.gitignore' },
		{ src: '_Gruntfile.js',			dest: 'Gruntfile.js' },
		{ src: '_README.md',			dest: 'README.md' },
		// src
		{ src: 'src/_readme.txt',	dest: 'src/readme.txt' },
		{ src: 'src/scss/_frontend.scss',	dest: 'src/scss/frontend.scss' },
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
	copyBaseTpls();

	// copy all readme
	self.fs.copyTpl(
		self.templatePath( '**/readme.md' ),
		self.destinationPath(),
		tplContext
	);

	if ( 'theme' === tplContext.projectType && tplContext.themeBase ) {
		switch( tplContext.themeBase ){
			case 'twentynineteen':

				copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/twentynineteen' ),
					self.destinationPath(),
					tplContext,
					{
						globPattern: [
							'**/*',
							'!src/classes/Main.php',
						],
					}
				);

				self.fs.copyTpl(
					self.templatePath( '../template_collections/twentynineteen/src/classes/Main.php' ),
					self.destinationPath( 'src/classes/' + startCase( kebabCase( tplContext.funcPrefix ) ) + '.php' ),
					tplContext
				);

				break;
		}
	}


	if ( 'plugin' === tplContext.projectType ) {

		self.fs.copyTpl(
			self.templatePath( '../templates/src/classes/Main.php' ),
			self.destinationPath( 'src/classes/' + startCase( kebabCase( tplContext.funcPrefix ) ) + '.php' ),
			tplContext
		);

	}

};

module.exports = generate;
