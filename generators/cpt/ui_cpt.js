'use strict';
const chalk = require('chalk');
const {
	startCase,
	get,
	find,
} = require('lodash');
const figlet = require('figlet');
const { prompt } = require('enquirer');
const path = require( 'path' );

const wpFeSanitizeTitle = require( '../../utils/wpFeSanitizeTitle' );
const getDestPkg = require( '../../utils/getDestPkg' );

const ui__resolver = require('../../utils/ui/ui__resolver');
const formFormatBool = require( '../../utils/ui/formFormatBool' );
const formFormatBoolString = require( '../../utils/ui/formFormatBoolString' );
const formResultBool = require( '../../utils/ui/formResultBool' );
const formResultBoolString = require( '../../utils/ui/formResultBoolString' );
const formValidate = require( '../../utils/ui/formValidate' );

const ui_cpt = function( self ){

	console.log( chalk.green( figlet.textSync( 'Post Type', {
		font: 'Ogre',
		horizontalLayout: 'fitted',
		verticalLayout: 'fitted'
	} ) ) );

	const destPkg = getDestPkg( this );

	const getInitial = ( choiceName, prompt ) => {
		switch( choiceName ){

			case 'singularName':
				return '';

			case 'displayName':
				return startCase( ( prompt.values.singularName || getInitial( 'singularName' ) ).replace( /-/g, ' ' ) );

			case 'hierarchical':
				return false;

			case 'hasArchive':
			case 'public':
			case 'canExport':
			case 'showInRest':
				return true;

		}
	};

	const projectTypeExplicit = get( self.props.answers, ['type'], '' );
	const projectTypeExplicitSC = startCase( projectTypeExplicit );

	const prompts = [
		{
			name: 'cptSetup',
			message: chalk.yellow( 'Add new custom posttype' ),
			type: 'form',
			initial: get( self.props.answers, ['cpt'], null ),
			validate( value, state, field ) {

				const formValidation = formValidate( value, state, {
					skipValidate: get( self.options, ['skipValidate'], '' ).split( ',' ),
					sanitized: [
						'singularName',
					],
					notEmpty: [
						'singularName',
						'displayName',
					],
				} );
				if ( true !== formValidation )
					return formValidation;

				const reservedCpts = [
					'post',
					'page',
					'attachment',
					'revision',
					'nav_menu_item',
					'custom_css',
					'customize_changeset',
					'user_request',
					'block',
				];

				if ( [...reservedCpts].includes( value['singularName'] ) ) {
					const fieldMessage = get( find( state._choices, { name: 'singularName' } ), ['message'],'singularName' );
					return fieldMessage + ' is a build in post type';
				}

				return true;
			},
			choices: [

				{
					name: 'singularName',
					message: 'Sanitized Name (singular, not prefixed)',
					initial: getInitial( 'singularName', this ),
				},

				{
					name: 'displayName',
					message: 'Display Name (singular, not prefixed)',
					onChoice( state, choice, i ) {
						choice.initial = getInitial( 'displayName', this );
					},
				},

				{
					name: 'hierarchical',
					message: 'Is hierarchical',
					initial: getInitial( 'hierarchical', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {
							msgEnabled: 'Yes, ' + chalk.italic( 'like pages' ),
							msgDisabled: 'No, ' + chalk.italic( 'like posts' ),
						}, this );
					},
					result: formResultBool,
				},

				{
					name: 'public',
					message: 'Is public',
					initial: getInitial( 'public', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {



							msgEnabled: 'Yes\n' + chalk.italic( [
								'public',
								'show_ui',
								'show_in_menu',
								'show_in_admin_bar',
								'show_in_nav_menus',
								'publicly_queryable',
								'!exclude_from_search',
							].map( str => '			' + str ).join( '\n' ) ),

							msgDisabled: 'No\n' + chalk.italic( [
								'!public',
								'!show_ui',
								'!show_in_menu',
								'!show_in_admin_bar',
								'!show_in_nav_menus',
								'!publicly_queryable',
								'exclude_from_search',
							].map( str => '			' + str ).join( '\n' ) ),


						}, this );
					},
					result: formResultBool,
				},

				{
					name: 'hasArchive',
					message: 'Has Archive',
					initial: getInitial( 'hasArchive', this ),
					format: formFormatBoolString,
					result: formResultBoolString,
				},

				{
					name: 'canExport',
					message: 'Can export',
					initial: getInitial( 'canExport', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},

				{
					name: 'showInRest',
					message: 'Show in REST',
					initial: getInitial( 'showInRest', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},

			],

		},

		{
			type: 'multiselect',
			name: 'cptSupports',
			message: 'Core feature(s) the post type supports',
			initial: [
				'title',
				'editor',
			],
			choices: [
				'title',
				'editor',
				'excerpt',
				'author',
				'thumbnail',
				'comments',
				'trackbacks',
				'revisions',
				'custom-fields',
				'page-attributes',
				'post-formats',
			],
		},

		{
			type: 'select',
			name: 'capabilityType',
			message: 'The string to use to build the read, edit, and delete capabilities',
			initial: 'post',
			choices: [
				'post',
				'page',
				// ??? needs custom support
			],
		},

	];

	return ui__resolver( this.name, prompts );

};


module.exports = ui_cpt;