const chalk = require('chalk');
const figlet = require('figlet');
const { prompt } = require('enquirer');
const semver = require('semver')
const {
	startCase,
	kebabCase,
	get,
	snakeCase,
} = require('lodash');
const path = require('path');

const ui__resolver = require( '../../utils/ui__resolver' );
const wpFeSanitizeTitle = require( '../../utils/wpFeSanitizeTitle' );
const validateForm = require( '../../utils/validateForm' );

const ui_setup = function( self ){

	console.log( chalk.green( figlet.textSync( get( self.props.answers, ['type'], 'Setup' ), {
		font: 'Ogre',
		horizontalLayout: 'fitted',
		verticalLayout: 'fitted'
	} ) ) );

	const getInitial = ( choiceName, prompt ) => {
		switch( choiceName ){


			case 'author':
				return 'example';	/// ??? get initial, remember

			case 'displayName':
				return startCase( ( prompt.values.name || getInitial( 'name' ) ).replace( /-/g, ' ' ) );

			case 'name':
				return wpFeSanitizeTitle( path.basename( process.cwd() ) );

			case 'authorUri':
				const author = get( prompt, ['values','author'], getInitial( 'author' ) );
				return 'https://github.com/' + author;

			case 'funcPrefix':
				let name = prompt.values.name || getInitial( 'name' );
				name = kebabCase( name );
				let nameParts = name.split('-');
				switch( true ) {
					case nameParts.length === 1:
						return name.replace( /\-/, '' ).substring( 0, 4 );
					case nameParts.length === 2:
						return [...nameParts].map( part => part.substring( 0, 2 ) ).slice( 0, 2 ).join( '' );
					case nameParts.length >= 3:
						return [...nameParts].map( part => part.substring( 0, 1 ) ).slice( 0, 4 ).join( '' );
				}

			case 'textDomain':
				return getInitial( 'funcPrefix', prompt );

			case 'wpRequiresAtLeast':
				return '4.7.0';

			case 'wpVersionTested':
				return '5.0.3';

			case 'phpRequiresAtLeast':
				return '5.6.0';

		}
	};

	const projectType = 'plugin' === get( self.props.answers, ['type'], '' ) ? 'plugin' : 'theme';
	const projectTypeExplicit = get( self.props.answers, ['type'], '' );
	const projectTypeExplicitSC = startCase( projectTypeExplicit );

	const prompts = [
		{
			name: 'setup',
			message: chalk.yellow( 'Setup ' + projectTypeExplicitSC ),
			type: 'form',
			initial: get( self.props.answers, ['setup'], null ),
			validate( value, state, field ) {

				const formValidation = validateForm( value, state, {
					skipValidate: get( self.options, ['skipValidate'], '' ).split( ',' ),
					sanitized: [
						'funcPrefix',
						'textDomain',
						'name',
						...( 'childtheme' === projectTypeExplicit ? ['template'] : [] ),
					],
					snakeCase: [
						'funcPrefix',
						'textDomain',
					],
					notEmpty: [
						'name',
						'displayName',
						...( 'childtheme' === projectTypeExplicit ? ['template'] : [] ),
						'description',
						'author',
						'authorUri',
						'repositoryUri',
						'uri',
						'tags',
						'funcPrefix',
						'textDomain',
						'wpRequiresAtLeast',
						'wpVersionTested',
						'phpRequiresAtLeast',
					],
				} );
				if ( true !== formValidation )
					return formValidation;

				if ( semver.compare( value['wpRequiresAtLeast'], value['wpVersionTested'] ) > 0 )
					return 'Required wp version can\'t be higher then tested wp verison';

				return true;
			},
			choices: [

				{
					name: 'name',
					message: 'Sanitized Name',
					initial: getInitial( 'name' ),
				},

				{
					name: 'displayName',
					message: 'Display Name',
					onChoice( state, choice, i ) {
						choice.initial = getInitial( 'displayName', this );
					},
				},

				...( 'childtheme' === projectTypeExplicit ? [ {
					name: 'template',
					message: 'Parent Theme (template)',
				} ] : [] ),

				{
					name: 'description',
					message: projectTypeExplicitSC + ' Description',
					initial: 'Example Description',
				},

				{
					name: 'author',
					message: 'Author',
					initial: getInitial( 'author' ),
				},

				{
					name: 'authorUri',
					message: 'Author Uri',
					onChoice( state, choice, i ) {
						choice.initial = getInitial( 'authorUri', this );
					},
				},

				{
					name: 'repositoryUri',
					message: 'Repository URL',
					onChoice( state, choice, i ) {
						const name = this.values.name || getInitial( 'name' );
						const author = this.values.author || getInitial( 'author' );
						choice.initial = 'https://github.com/' + author + '/' + name;
					}
				},

				{
					name: 'uri',
					message: startCase( projectType ) + ' URL',
					onChoice( state, choice, i ) {
						const name = this.values.name || getInitial( 'name' );
						const author = this.values.author || getInitial( 'author' );
						if ( this.values.authorUri ) {
							choice.initial = this.values.authorUri + '/' + name;
						} else {
							choice.initial = 'https://github.com/' + author + '/' + name;
						}
					}
				},

				{
					name: 'donateLink',
					message: 'Donate Link',
					onChoice( state, choice, i ) {
						const author = this.values.author || getInitial( 'author' )
						if ( undefined === this.values.authorUri || getInitial( 'authorUri', this ) + '/' + author === this.values.authorUri ){
							choice.initial = 'https://example.com/donate';
						} else {
							choice.initial = this.values.authorUri + '/donate';
						}
					}
				},

				{
					name: 'tags',
					message: 'Comma Separated Tags',
				},

				{
					name: 'funcPrefix',
					message: 'Function Prefix',
					onChoice( state, choice, i ) {
						choice.initial = snakeCase( getInitial( choice.name, this ) );
					},
				},

				{
					name: 'textDomain',
					message: 'Text Domain',
					onChoice( state, choice, i ) {
						choice.initial = this.values.funcPrefix || getInitial( 'funcPrefix', this );
					}
				},

				{
					name: 'wpRequiresAtLeast',
					message: 'WP Requires At Least',
					initial: getInitial( 'wpRequiresAtLeast' ),
				},

				{
					name: 'wpVersionTested',
					message: 'WP Version Tested',
					onChoice( state, choice, i ) {
						choice.initial = this.values.wpRequiresAtLeast && semver.valid( this.values.wpRequiresAtLeast )
							? 1 === semver.compare( this.values.wpRequiresAtLeast, getInitial( 'wpVersionTested' ) )
								? this.values.wpRequiresAtLeast
								: getInitial( 'wpVersionTested' )
							: getInitial( 'wpVersionTested' );
					}
				},

				{
					name: 'phpRequiresAtLeast',
					message: 'PHP Requires At Least',
					initial:getInitial( 'phpRequiresAtLeast' )
				},
			],


		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_setup;
