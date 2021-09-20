const {
	startCase,
	kebabCase,
	set,
	get,
} = require('lodash');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');

const generate = ( self, options ) => {

	const { tplContext } = options;

	let jsonFiles = [
		{
			dest: '.wde_nextRelease.json',
			data: {
				changes: [],
			},
		},
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
				['minimum-stability']: 'dev',
				['prefer-stable']: true,
				require: {},
				['require-dev']: {
					['croox/wp-dev-env-frame']: tplContext.generatorPkg.subModules['croox/wp-dev-env-frame'],
					['composer/installers']: '*',
					...( 'theme' === tplContext.projectType && {
						['wp-bootstrap/wp-bootstrap-navwalker']: '^4.3',
					} ),
				},
				repositories: [
					{
						type: 'vcs',
						url: 'https://github.com/croox/wp-dev-env-frame',
					},
					...( 'theme' === tplContext.projectType ? [
						{
							type: 'vcs',
							url: 'https://github.com/wp-bootstrap/wp-bootstrap-navwalker',
						},
					] : [] ),
				],
				autoload: {
					['psr-4']: {
						[tplContext.funcPrefix + '\\']: 'src/classes/',
						['']: [
							...( 'theme' === tplContext.projectType ? ['vendor/wp-bootstrap/wp-bootstrap-navwalker/'] : [] ),
						],
					},
				},
			},
		},
		{
			dest: 'grunt/copyComposerPackages.json',
			data: {
				packages: [
					...( 'theme' === tplContext.projectType ? ['wp-bootstrap/wp-bootstrap-navwalker'] : [] ),
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
					version: tplContext.generatorPkg.version,
					...( tplContext.generator.themeBase && { themeBase: tplContext.generator.themeBase } ),
				},
				scripts: {
					test: 'echo \"Error: no test specified\" && exit 1',
				},
				devDependencies: {
					grunt: '^1.3.0',
					['wp-dev-env-grunt']: 'git+ssh://git@github.com/croox/wp-dev-env-grunt.git#' + tplContext.generatorPkg.subModules['wp-dev-env-grunt'],
				},
				['shim']: {
					jquery: 'jQuery',
					react: 'React',
					'react-dom': 'ReactDOM',
					lodash: 'lodash',
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
					plugins: tplContext.author + '@example.com:/abs_path/to/wp/wp-content/plugins/',
					themes: tplContext.author + '@example.com:/abs_path/to/wp/wp-content/themes/',
					port: 1234,
					args: [
						"--size-only",
					],
				},
			},
		},
	];

	const copyBaseTpls = () => [
		// root
		{ src: '_gitignore',			dest: '.gitignore' },
		{ src: '_Gruntfile.js',			dest: 'Gruntfile.js' },
		{ src: '_index.php',			dest: 'index.php' },
		{ src: '_README.md',			dest: 'README.md' },
		// grunt
		{ src: 'grunt/_addComposerCopyTask.js',	dest: 'grunt/addComposerCopyTask.js' },
		{ src: 'grunt/hooked/_addComposerCopyTasks.js',	dest: 'grunt/hooked/addComposerCopyTasks.js' },
		// src
		{ src: 'src/_readme.txt',	dest: 'src/readme.txt' },
		{ src: 'src/scss/_frontend.scss',	dest: 'src/scss/' + tplContext.funcPrefix + '_frontend.scss' },
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

	// copy templates
	copyBaseTpls();

	// copy all readme
	self.fs.copyTpl(
		self.templatePath( '**/readme.md' ),
		self.destinationPath(),
		tplContext
	);

	if ( tplContext.generator.themeBase ) {
		switch( tplContext.generator.themeBase ){
			case 'underboots':
			case 'underboots_simple_no_sidebar':

				// json files
				const packageJsonIndex = jsonFiles.findIndex( file => 'package.json' === file.dest );
				set( jsonFiles, [[packageJsonIndex],'data','dependencies'], {
					...get( jsonFiles, [[packageJsonIndex],'data','dependencies'], {} ),
					bootstrap: '^4.3.1',
					['font-awesome']: '^4.7.0',
					['popper.js']: '^1.15.0',
				} );

				// copy main class
				self.fs.copyTpl(
					self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/classes/Main.php' ),
					self.destinationPath( 'src/classes/' + startCase( kebabCase( tplContext.funcPrefix ) ) + '.php' ),
					tplContext
				);

				// copy templates, exclude all scss js
				copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/' + tplContext.generator.themeBase ),
					self.destinationPath(),
					tplContext,
					{
						globPattern: [
							'**/*',
							'!src/classes/Main.php',
							'!src/scss/**/*',
							'!src/js/**/*',
						],
					}
				);

				/**
				 * scss
				 */
				// copy scss subdir files
				[
					'_frontend',
					'_editor',
				].map( dir => copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/scss/' + dir + '/' ),
					self.destinationPath( 'src/scss/' + tplContext.funcPrefix + dir ),
					tplContext,
					{
						globPattern: [
							'**/*.scss',
						],
					}
				) );
				// copy scss entry files
				[
					'_frontend',
					'_editor',
					'_classic_editor_tiny_mce',
				].map( basename => {
					self.fs.copyTpl(
						self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/scss/' + basename + '.scss' ),
						self.destinationPath( 'src/scss/' + tplContext.funcPrefix + basename + '.scss' ),
						tplContext
					);
				} );

				/**
				 * js
				 */
				// copy js templates, exclude _script/*, _script_editor/* and entry files
				copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/js/' ),
					self.destinationPath( 'src/js/' ),
					tplContext,
					{
						globPattern: [
							'**/*.js',
							'!script.js',
							'!_script/**/*.js',
							'!script_editor.js',
							'!_script_editor/**/*.js',
							'!customizer.js',
							'!_customizer/**/*.js',
						],
					}
				);
				// copy js templates _script/* _script_editor/* _customizer/*
				[
					'_script',
					'_script_editor',
					'_customizer',
				].map( dir => copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/js/' + dir + '/' ),
					self.destinationPath( 'src/js/' + tplContext.funcPrefix + dir ),
					tplContext,
					{
						globPattern: [
							'**/*.js',
						],
					}
				) );
				// copy js entry files
				[
					'script',
					'script_editor',
					'customizer',
				].map( basename => {
					self.fs.copyTpl(
						self.templatePath( '../template_collections/' + tplContext.generator.themeBase + '/src/js/' + basename + '.js' ),
						self.destinationPath( 'src/js/' + tplContext.funcPrefix + '_' + basename + '.js' ),
						tplContext
					);
				} );

				break;
			case 'empty':

				// copy templates
				copyTemplatesBulk(
					self,
					self.templatePath( '../template_collections/empty' ),
					self.destinationPath(),
					tplContext,
					{
						globPattern: [
							'**/*',
							'!src/classes/Main.php',
						],
					}
				);

				// copy main class
				self.fs.copyTpl(
					self.templatePath( '../templates/src/classes/Main.php' ),
					self.destinationPath( 'src/classes/' + startCase( kebabCase( tplContext.funcPrefix ) ) + '.php' ),
					tplContext
				);

				break;

		}
	} else {
		self.fs.copyTpl(
			self.templatePath( '../templates/src/classes/Main.php' ),
			self.destinationPath( 'src/classes/' + startCase( kebabCase( tplContext.funcPrefix ) ) + '.php' ),
			tplContext
		);
	}

	// generate json
	[...jsonFiles].map( obj => self.fs.writeJSON(
		obj.dest,
		obj.data
	) );

	// Return a promise.
	// But can't find a way to wait for mem-fs-editor to be done.
	// So the promise resolves directly. And whatever calls this function
	// has to handle it somehow and wait that all is done.
	return new Promise( resolve => resolve() );

};

module.exports = generate;
