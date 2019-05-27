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
const getDestPkg = require('../../utils/getDestPkg');
const pkg = require('../../package.json');

module.exports = class extends Generator {

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
		console.log( '' );
		console.log( gradient.rainbow( figlet.textSync( 'wp-dev-env', {
			font: 'Ogre',
			horizontalLayout: 'fitted',
			verticalLayout: 'fitted'
		} ) ) );
		console.log( '' );

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
			console.log(
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
				console.log(
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
						default:
							this.tplContext.parent_class = 'Childtheme';
					}
				}

				if ( get( this, ['tplContext','generator','themeBase'], false ) ) {
					switch( this.tplContext.generator.themeBase ) {
						case 'twentynineteen':
							this.tplContext.parent_class = 'Theme_Twentynineteen';
							break;
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
		};

		switch( true ) {

			case this.props.isNewProject:
				generate( this, options );
				break;

			case 'updateWde' === this.tplContext.type:
				const checkGitStatus = () => {
					return new Promise( ( resolve, reject ) => {
						simpleGit.status( ( err, status ) => {
							if ( err !== null ) {
								console.log( chalk.bold.red( 'Error simpleGit' ) );
								console.log( err );
								reject();
							}
							if ( status === null ) {
								console.log( chalk.bold.red( 'Error' ) );
								console.log( 'No git repository initialized' );
								reject();
							}
							if ( status.files.length > 0 ) {
								console.log( chalk.bold.red( 'Uncommited changes' ) );
								console.log( status.files );
								reject();
							}
							resolve();
						} );
					} ).catch( e => {
						console.log( 'Exit' );
						process.exit();
					} );
				};
				const switchBranch = () => {
					return new Promise( ( resolve, reject ) => {
						simpleGit.checkout( 'generated', ( err, res  ) => {
							if ( err )
								reject( err );
							console.log( '' );
							console.log( 'Switched to branch ' + chalk.bgBlack( 'generated' ) );
							console.log( '' );
							resolve( res );
						} );
					} ).catch( e => {
						console.log( chalk.red.bold( e ) );
						process.exit();
					} );
				};
				checkGitStatus().then( switchBranch ).then( () => generate( this, options ) );
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
						cmd: 'npm',
						args: ['install'],
					},
					{
						cmd: 'composer',
						args: ['install','--profile','-v'],
					},
					{
						cmd: 'grunt',
						args: ['build'],
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
						args: ['commit','-m "Hurray, just generated a new ' + this.props.answers.type + '!"'],
					},
					{
						cmd: 'git',
						args: ['branch','generated'],
					},
				], self ).then( result => {
					[
						'',
						'',
						chalk.green.bold( '✔ Everything is ready!' ),
						'',
						'Currently on branch ' + chalk.bgBlack( 'master' ),
						'The ' + chalk.bgBlack( 'generated' ) + ' branch should not be modified manually. It should contain plain generated projects only.',
						'',
						chalk.cyan( 'What to do next?' ),
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
					].map( str => this.log( str ) );
				} ).catch( err => console.log( err ) );
				break;

			case 'updateWde' === this.tplContext.type:
				chainCommandsAndFunctions(	[
					{
						func: createScreenshot,
						args: [self,self.tplContext.funcPrefix],
					},
					{
						cmd: 'git',
						args: ['add','--all'],
					},
					{
						cmd: 'git',
						args: ['commit','-m "Updated to generator-wp-dev-env#' + this.tplContext.generatorPkg.version + ' (wp-dev-env-grunt#' + this.tplContext.generatorPkg.subModules['wp-dev-env-grunt'] + ' wp-dev-env-frame#' + this.tplContext.generatorPkg.subModules['croox/wp-dev-env-frame'] + ')"'],
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
						'	Compare commits of ' + chalk.bgBlack( 'generated' ) + ' branch.',
						'	Merge ' + chalk.bgBlack( 'generated' ) + ' branch into ' + chalk.bgBlack( 'master' ),
						'	Checkout ' + chalk.bgBlack( 'master' ) + ' branch and go on coding.' ,
						'',
					].map( str => this.log( str ) );
				} ).catch( err => console.log( err ) );

				break;
		}

	}

};
