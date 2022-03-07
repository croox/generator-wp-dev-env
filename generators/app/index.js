'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const childProcess = require('child_process');
const gradient = require('gradient-string');
const figlet = require('figlet');
const simpleGit = require('simple-git')();

const {
	findIndex,
	get,
	set,
	startCase,
	snakeCase,
	kebabCase,
	upperFirst,
	isUndefined,
} = require('lodash');

const ui_chooseType = require('./ui_chooseType');
const ui_setup = require('./ui_setup');
const ui_themeBase = require('./ui_themeBase');
const generate = require('./generate');
const createScreenshot = require('../../utils/createScreenshot');
const chainCommandsAndFunctions = require('../../utils/chainCommandsAndFunctions');
const ui_block = require('../block/ui_block');
const ui_assets = require('../assets/ui_assets');
const ui_cpt = require('../cpt/ui_cpt');
const ui_chooseComposerPkg = require('../composerPackage/ui_chooseComposerPkg');
const addChangeP = require('../../utils/addChangeP');
const getDestPkg = require('../../utils/getDestPkg');
const logAndExit = require('../../utils/logAndExit');
const gitAddOriginUpstream = require('../../utils/gitAddOriginUpstream');
const cleanDestination = require('../../utils/cleanDestination');
const pkg = require('../../package.json');

module.exports = class extends Generator {

	constructor( args, opts ) {
		opts['nodePackageManager'] = 'custom';
		super(args, opts);
		this.env.options['nodePackageManager'] = 'custom';
	  }

	initializing() {
		const destPkg = getDestPkg( this );

		this.props = {
			isNewProject: destPkg === null,	// if initializing
		};

		this.props = {
			...this.props,
			uiElements: [
				{
					name: 'ui_chooseType',
					func: ui_chooseType,
					when: answers => true,
				},
				{
					name: 'ui_themeBase',
					func: ui_themeBase,
					when: answers => 'theme' === answers.type,
				},
				{
					name: 'ui_setup',
					func: ui_setup,
					when: answers => this.props.isNewProject,	// if initializing
				},
				{
					name: 'ui_block',
					func: ui_block,
					when: answers => 'block' === answers.type,
				},
				{
					name: 'ui_cpt',
					func: ui_cpt,
					when: answers => 'cpt' === answers.type,
				},
				{
					name: 'ui_chooseComposerPkg',
					func: ui_chooseComposerPkg,
					when: answers => 'composerPackage' === answers.type,
				},
				{
					name: 'ui_assets',
					func: ui_assets,
					when: answers => 'assets' === answers.type,
				},
			],
			lastUiEl: 0,
			answers: {},
			cancel: null,
		};

		this.tplContext = {
			generatorPkg: { ...pkg },
			generator: {},
		};

	}

	_updateProps( result ) {
		if ( result ) {
			this.props = {
				...this.props,
				answers: {
					...this.props.answers,
					...( result.answers && result.answers ),
				},
				lastUiEl: findIndex( this.props.uiElements, element => element.name === result.uiElementName ),
			};
		}
	}

	_validate(){
		this.props.lastUiEl = 0;
		const { answers } = this.props;

		if ( this.props.cancel === true )
			return false;

		let isValid = true;

		// nonsense test
		// isValid = answers.type = 'theme' ? false : isValid;

		return isValid ? isValid : this.prompting();
	}

	prompting() {
		const self = this;

		// print header
		this.log( '' );
		this.log( gradient.rainbow( figlet.textSync( 'wp-dev-env', {
			font: 'Ogre',
			horizontalLayout: 'fitted',
			verticalLayout: 'fitted'
		} ) ) );
		this.log( '' );

		self._updateProps();

		const whatNext = ( result ) => {
			if ( result.answers ) {
				self._updateProps( result )
				// hasNext ? go next possible : return all answers
				const getNext = counter => {
					counter = counter ? counter : 1;
					const next = get( self.props.uiElements, [self.props.lastUiEl + counter], false );
					return next ? next.when && ! next.when( self.props.answers ) ? getNext( counter + 1 ) : next : false;
				}
				const next = getNext();
				return next
					? new Promise( resolve => resolve( next.func( self ).then( whatNext ) ) )
					: self.props.answers;
			} else {
				// hasLast ? go back : return false
				return findIndex( self.props.uiElements, element => element.name === result.uiElementName ) > 0
					? new Promise( resolve => resolve( self.props.uiElements[self.props.lastUiEl]['func'](self).then( whatNext ) ) )
					: false;
			}
		};

		return new Promise( resolve => resolve( self.props.uiElements[self.props.lastUiEl]['func'](self).then( whatNext ) ) )
			.then( answers => false === answers ? self.props.cancel = true : null )
			.then( self._setTplContext.bind( self ) )
			.then( self._validate.bind( self ) );

	}

	_setTplContext() {

		const { answers } = this.props;

		const destPkg = getDestPkg( this );
		if ( null === destPkg && ! this.props.isNewProject ) {
			this.log(
				chalk.bold.red( 'Missing ' ) +
				chalk.bgBlack( 'package.json' )
				);
			this.props.cancel = true;
			process.exit();
		}


		/**
		 * destPkgPropToTplContext
		 *
		 * Assigns a property from destination package.json to tplContext.
		 * If property missing, log error and exit process.
		 *
		 * @param string prop       '.' separated path of the property.
		 */
		const destPkgPropToTplContext = prop => {
			if ( get( destPkg, prop.split('.'), false ) ) {
				set(
					this.tplContext, prop.split('.'),
					get( destPkg, prop.split('.') )
				);
			} else {
				this.log(
					chalk.bold.red( 'Missing ' ) +
					chalk.bgBlack( prop ) +
					' in ' +
					chalk.bgBlack( 'package.json' )
				);
				process.exit();
			}
		};


		/**
		 * tplContext
		 * assign helper methods
		 */
		this.tplContext = {
			...this.tplContext,
			// lodash string methods to tplContext
			startCase: startCase,
			upperFirst: upperFirst,
			snakeCase: snakeCase,
			kebabCase: kebabCase,
			isUndefined: isUndefined,
		};


		/**
		 * tplContext
		 * set ~ types
		 * - `type` 				:: type of generator
		 * - `projectType` 			:: plugin || theme
		 * - `projectTypeExplicit`	:: plugin || theme || childtheme
		 */
		this.tplContext.type = answers.type;
		if ( this.props.isNewProject ) {
			this.tplContext.projectType = 'childtheme' === answers.type ? 'theme' : answers.type ;
			this.tplContext.projectTypeExplicit = answers.type;
		} else {
			destPkgPropToTplContext( 'projectType' );
			this.tplContext.projectTypeExplicit = destPkg.template ? 'childtheme' : destPkg.projectType;
		}


		/**
		 * tplContext
		 * assign subgenerator prompt answers
		 */
		this.tplContext = {
			...this.tplContext,

			// subgenerator block: assign answers.block to tplContext.block
			...( undefined !== answers.block && { block: answers.block } ),

			// subgenerator cpt: assign answers from cpt prompts to tplContext.cpt
			...( undefined !== answers.cptSetup && {
				cpt: {
					...answers.cptSetup,
					supports: answers.cptSupports,
					capabilityType: answers.capabilityType,
				}
			} ),

			// subgenerator composerPackage: assign answers.composerPkgs to tplContext.composerPkgs
			...( undefined !== answers.composerPkgs && { composerPkgs: answers.composerPkgs } ),

			// subgenerator assets: assign answers.assetSetup to tplContext.assets
			...( undefined !== answers.assetSetup && { assets: answers.assetSetup } ),
		};


		/**
		 * tplContext
		 * assign main generator props
		 */
		if ( this.props.isNewProject ) {
			// get props from generator prompt answers and assign to tplContext
			this.tplContext = {
				...this.tplContext,
				// assign answers.setup directly to tplContext
				...( undefined !== answers.setup && answers.setup ),
			};
			this.tplContext.generator = {
				...this.tplContext.generator,
				// assign answers.themeBase to tplContext.generator.themeBase
				...( undefined !== answers.themeBase && {
					themeBase: answers.themeBase
				} ),
			};
		} else {
			// get props from destPkg and assign to tplContext
			[
				'name',
				'displayName',
				'description',
				'author',
				'authorUri',
				'repositoryUri',
				'uri',
				'donateLink',
				'tags',
				'funcPrefix',
				'projectType',
				'textDomain',
				'wpRequiresAtLeast',
				'wpVersionTested',
				'phpRequiresAtLeast',
				...( 'theme' === this.tplContext.projectTypeExplicit ? [
					'generator.themeBase',
				] : [] ),
				...( 'childtheme' === this.tplContext.projectTypeExplicit ? [
					'template'
				] : [] ),
			].map( destPkgPropToTplContext );
		}


		/**
		 * tplContext
		 * set project_class
		 * e.g. ~ namespace\project_class
		 */
		this.tplContext.project_class = this.tplContext.funcPrefix + '\\' + startCase( kebabCase( this.tplContext.funcPrefix ) );


		/**
		 * tplContext
		 * set wde-frame parent_class, without namespace
		 */
		switch( this.tplContext.projectType ){
			case 'theme':
				this.tplContext.parent_class = 'Theme';

				if ( get( this, ['tplContext','template'], false ) ) {
					switch( this.tplContext.template ) {
						case 'enfold':
							this.tplContext.parent_class = 'Childtheme_Enfold';
							break;
						case 'hello-elementor':
							this.tplContext.parent_class = 'Childtheme_Hello_Elementor';
							break;
						default:
							this.tplContext.parent_class = 'Childtheme';
					}
				}

				if ( get( this, ['tplContext','generator','themeBase'], false ) ) {
					switch( this.tplContext.generator.themeBase ) {
						case 'empty':
						default:
							this.tplContext.parent_class = 'Theme';
					}
				}
				break;

			case 'plugin':
				this.tplContext.parent_class = 'Plugin';
				break;
		}

	};

	writing() {
		if ( true === this.props.cancel )
			return;

		const options = {
			cancel: this.props.cancel,
			calledBy: 'app',
			tplContext: this.tplContext,
			...( this.options['verbose'] && { 		['verbose']: 		this.options['verbose'] } ),
			...( this.options['skip-validate'] && {	['skip-validate']: 	this.options['skip-validate'] } ),
		};

		let done = null;

		switch( true ) {

			case this.props.isNewProject:
				done = this.async();
				generate( this, options ).then( () => done() );
				break;

			case 'updateWde' === this.tplContext.type:
				done = this.async();
				const checkGitStatus = () => {
					return new Promise( ( resolve, reject ) => {
						simpleGit.status( ( err, status ) => {
							if ( err !== null ) {
								this.log( chalk.bold.red( 'Error simpleGit' ) );
								this.log( err );
								reject();
							}
							if ( status === null ) {
								this.log( chalk.bold.red( 'Error' ) );
								this.log( 'No git repository initialized' );
								reject();
							}
							if ( status.files.length > 0 ) {
								this.log( chalk.bold.red( 'Uncommited changes' ) );
								this.log( status.files );
								reject();
							}
							resolve();
						} );
					} ).catch( e => logAndExit( this, e ) );
				};
				const switchBranch = () => {
					return new Promise( ( resolve, reject ) => {
						simpleGit.checkout( 'generated', ( err, res  ) => {
							if ( err )
								reject( err );
							this.log( '' );
							this.log( 'Switched to branch ' + chalk.bgBlack( 'generated' ) );
							this.log( '' );
							resolve( res );
						} );
					} ).catch( e => logAndExit( this, e ) );
				};
				checkGitStatus()
				.then( switchBranch )
				.then( () => cleanDestination( this ) )
				.then( () => generate( this, options ) )
				.then( () => done() );
				break;

			default:
				this._callSubgenerator( options );

		}

	}

	_callSubgenerator( options ) {
		// generate with subgenerator
		switch ( options.tplContext.type ) {
			case 'block':
				this.composeWith( require.resolve('../block'), options );
				break;
			case 'cpt':
				this.composeWith( require.resolve('../cpt'), options );
				break;
			case 'composerPackage':
				this.composeWith( require.resolve('../composerPackage'), options );
				break;
			case 'assets':
				this.composeWith( require.resolve('../assets'), options );
				break;
		}
	}

	install() {
		if ( true === this.props.cancel )
			return;

		const self = this;

		switch( true ) {

			case this.props.isNewProject:
				chainCommandsAndFunctions(	[
					{
						func: createScreenshot,
						args: [self,self.tplContext.funcPrefix],
					},
					{
						cmd: 'composer',
						args: [
							'install',
							'--profile',
							...( this.options.verbose ? ['-vvv'] : [] ),
						],
					},
					{
						cmd: 'npm',
						args: [
							'install',
							...( self.options.verbose ? ['--verbose'] : [] ),
						],
					},
					{
						cmd: 'git',
						args: ['init'],
					},
					{
						cmd: 'git',
						args: ['add','--all'],
					},
					{
						cmd: 'git',
						args: ['commit','-m','Initialized Project, generator-wp-dev-env#' + self.tplContext.generatorPkg.version + ' (wp-dev-env-grunt#' + self.tplContext.generatorPkg.subModules['wp-dev-env-grunt'] + ' wp-dev-env-frame#' + self.tplContext.generatorPkg.subModules['croox/wp-dev-env-frame'] + ')'],
					},
					{
						cmd: 'git',
						args: ['branch','generated'],
					},
					{
						cmd: 'git',
						args: ['checkout','-b','develop'],
					},
					{
						cmd: 'grunt',
						args: ['build'],	// do we want that to may be verbose as well?
					},
					{
						cmd: 'git',
						args: ['add','--all'],
					},
					{
						cmd: 'git',
						args: ['commit','-m','Build successful'],
					},
					{
						func: gitAddOriginUpstream,
						args: [self],
					},
				], self ).then( result => {
					[
						'',
						'',
						chalk.green.bold( '✔ Everything is ready!' ),
						'',
						'Currently on branch ' + chalk.bgBlack( 'develop' ),
						'The ' + chalk.bgBlack( 'master' ) + ' branch should not be modified manually. ???',
						'The ' + chalk.bgBlack( 'dev' ) + ' branch reflects a state with the latest delivered development changes for the next release.',
						'The ' + chalk.bgBlack( 'generated' ) + ' branch should not be modified manually. It should contain plain generated projects only.',
						'Read the documentation\'s "git_branching_model" section for further information about the git branching model.',
						'',
						chalk.cyan( 'What to do next?' ),
						'',
						'	run ' + chalk.yellow( 'git checkout -b feature-something develop' ),
						'		' + chalk.italic( 'To Create a new feature branch from the current ' + chalk.bgBlack( 'develop' ) + ' branch.' ),
						'',
						'	run ' + chalk.yellow( 'yo wp-dev-env' ),
						'		' + chalk.italic( 'to choose a subgenerator.' ),
						'',
						'	run ' + chalk.yellow( 'grunt' ),
						'		' + chalk.italic( 'to see available grunt tasks.' ),
						'',
						'	edit and rename ' + chalk.yellow( './wde_wp_installs-sample.json' ),
						'		' + chalk.italic( 'to let grunt know about some sync desitinations.' ),
						'',
					].map( str => self.log( str ) );
				} ).catch( err => self.log( err ) );
				break;

			case 'updateWde' === self.tplContext.type:
				const msg = [
					'Updated to generator-wp-dev-env#' + self.tplContext.generatorPkg.version,
					'(',
					'wp-dev-env-grunt#' + self.tplContext.generatorPkg.subModules['wp-dev-env-grunt'],
					'wp-dev-env-frame#' + self.tplContext.generatorPkg.subModules['croox/wp-dev-env-frame'],
					')',
				].join(' ');
				chainCommandsAndFunctions( [
					{
						func: createScreenshot,
						args: [self,self.tplContext.funcPrefix],
					},
					{
						func: addChangeP,
						args: [
							self,
							'changed',
							msg,
						],
					},
					{
						cmd: 'git',
						args: ['add','--all'],
					},
					{
						cmd: 'git',
						args: ['commit','-m',msg],
					},
				], self ).then( result => {
					[
						'',
						'',
						chalk.green.bold( '✔ Project regenerated into branch ' ) + chalk.bgBlack( 'generated' ),
						'',
						'Currently on branch ' + chalk.bgBlack( 'generated' ),
						'This branch should not be modified manually. It should contain plain generated projects only.',
						'',
						chalk.cyan( 'What to do next?' ),
						'',
						'	It might be helpful to reinstall the dependencies with ' + chalk.bgBlack( 'npm install; composer update -vvv' ),
						'	And build the project with ' + chalk.bgBlack( 'grunt build' ),
						'',
						'	Compare commits of ' + chalk.bgBlack( 'generated' ) + ' branch.',
						'	Merge ' + chalk.bgBlack( 'generated' ) + ' branch into ' + chalk.bgBlack( 'develop' ) + ' and go on coding.' ,
						'',
					].map( str => self.log( str ) );
				} ).catch( err => self.log( err ) );

				break;
		}

	}

};
