'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const childProcess = require('child_process');
const gradient = require('gradient-string');
const figlet = require('figlet');

const {
	findIndex,
	get,
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
const ui_block = require('../block/ui_block');
const getDestPkg = require('../../utils/getDestPkg');
const pkg = require('../../package.json');

module.exports = class extends Generator {

	initializing() {
		const destPkg = getDestPkg( this );

		this.props = {
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
					when: answers => destPkg === null,	// if initializing
				},
				{
					name: 'ui_block',
					func: ui_block,
					when: answers => 'block' === answers.type,
				},

			],
			lastUiEl: 0,
			answers: {},
			cancel: null,
		};

		this.tplContext = {};

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

		this.tplContext = {
			...( undefined !== answers.setup && answers.setup ),
			...( undefined !== answers.block && { block: answers.block } ),
			...( undefined !== answers.themeBase && { themeBase: answers.themeBase } ),
			generator: { ...pkg },
			startCase: startCase,
			upperFirst: upperFirst,
			snakeCase: snakeCase,
			kebabCase: kebabCase,
			isUndefined: isUndefined,
		};

		// type 				:: type of generator
		// projectType 			:: plugin || theme
		// projectTypeExplicit	:: plugin || theme || childtheme
		this.tplContext.type = answers.type;
		if ( answers.setup ) {
			// is generating new roject
			this.tplContext.projectType = 'childtheme' === answers.type ? 'theme' : answers.type ;
			this.tplContext.projectTypeExplicit = answers.type;
		} else {
			// project exists, generating sub
			const destPkg = getDestPkg( this );
			if ( null === destPkg ) return this.props.cancel = true;
			[
				'projectType',
				'funcPrefix',
				'name',
				'textDomain',
			].map( prop => this.tplContext[prop] = destPkg[prop] );
			this.tplContext.projectTypeExplicit = destPkg.template ? 'childtheme' : destPkg.projectType;

		}

		// namespace\project_class
		this.tplContext.project_class = this.tplContext.funcPrefix + '\\' + startCase( kebabCase( this.tplContext.funcPrefix ) );

		// parent_class, without namespace
		if ( 'theme' === this.tplContext.projectType ) {
			this.tplContext.parent_class = 'Theme';
			if ( typeof this.tplContext.template !== 'undefined' ) {
				switch( this.tplContext.template ) {
					case 'enfold':
						this.tplContext.parent_class = 'Childtheme_Enfold';
						break;
					default:
						this.tplContext.parent_class = 'Childtheme';
					}
			}
			if ( typeof this.tplContext.themeBase !== 'undefined' ) {
				switch( this.tplContext.themeBase ) {
					case 'twentynineteen':
						this.tplContext.parent_class = 'Theme_Twentynineteen';
						break;
					}
			}
		}
		if ( 'plugin' === this.tplContext.projectType ) {
			this.tplContext.parent_class = 'Plugin';
		}

		if ( this.tplContext.projectTypeExplicit !== 'childtheme' && this.tplContext.template ) {
			// ??? ... we should not reach here
			this.log( chalk.red( 'debug error, we shouldnt have template if no childtheme. something went wrong' ), this.tplContext );		// ??? debug
		}

	};

	writing() {
		if ( true === this.props.cancel )
			return;

		const options = {
			cancel: this.props.cancel,
			calledBy: 'app',
			tplContext: this.tplContext,
			// answers: this.props.answers,
		};

		this._callSubgenerator( options );

		if ( ['theme','childtheme','plugin'].includes( this.tplContext.type ) ) {
			generate( this, options );
		}
	}

	_callSubgenerator( options ) {
		// generate with subgenerator
		switch ( options.tplContext.type ) {
			case 'block':
				this.composeWith( require.resolve('../block'), options );
				break;
		}
	}

	install() {
		if ( true === this.props.cancel )
			return;

		if ( ! ['theme','childtheme','plugin'].includes( this.props.answers.type ) )
			return;

		this.installDependencies({
			bower: false,
			npm: true,
		}).then( () => {
			if ( this.options.git !== 'false' ) {
				[
					'composer install --profile -v',
					'grunt build',
					'git init',
					'git add .',
					'git commit -m "Hurray, just generated a new ' + this.props.answers.type + '!"',

				].map( cmd => {
					this.log('');
					this.log( chalk.green( 'running ' ) + chalk.yellow( cmd ) );
					this.log('');
					childProcess.execSync( cmd, { stdio:'inherit' } );
				} );
			}

			[
				'',
				'',
				'',
				chalk.green.bold( '✔ Everything is ready!' ),
				'',
				'',
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

		});

	}
};
