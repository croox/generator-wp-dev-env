'use strict';
const chalk = require('chalk');
const {
	startCase,
	get,
} = require('lodash');
const figlet = require('figlet');
const { prompt } = require('enquirer');
const path = require( 'path' );

const ui__resolver = require('../../utils/ui/ui__resolver');
// const wpFeSanitizeTitle = require( '../../utils/wpFeSanitizeTitle' );
const getDestPkg = require( '../../utils/getDestPkg' );


const formFormatBool = require( '../../utils/ui/formFormatBool' );
const formFormatBoolString = require( '../../utils/ui/formFormatBoolString' );
const formResultBool = require( '../../utils/ui/formResultBool' );
const formResultBoolString = require( '../../utils/ui/formResultBoolString' );
const formValidate = require( '../../utils/ui/formValidate' );


const ui_assets = function( self ){

	console.log( chalk.green( figlet.textSync( 'Assets', {
		font: 'Ogre',
		horizontalLayout: 'fitted',
		verticalLayout: 'fitted'
	} ) ) );

	const destPkg = getDestPkg( self );


	const getInitial = ( choiceName, prompt ) => {
		switch( choiceName ){

			case 'script':
			case 'style':
			case 'enqueueFrontend':
			case 'enqueueAdmin':
				return false;

			case 'name':
				return '';

		}
	};

	const prompts = [
		{
			name: 'assetSetup',
			message: chalk.yellow( 'What type of Asset?' ),
			type: 'form',
			initial: get( self.props.answers, ['setup'], null ),
			validate( value, state, field ) {

				const formValidation = formValidate( value, state, {
					skipValidate: get( self.options, ['skipValidate'], '' ).split( ',' ),
					sanitized: [
						'name',
					],
					snakeCase: [
						'name',
					],
					notEmpty: [
						'name',
					],
				} );
				if ( true !== formValidation )
					return formValidation;

				if ( ! [
					get( value, ['script'], false ),
					get( value, ['style'], false ),
				].includes( true ) )
					return 'Must be script, style or both';

				if ( ! [
					get( value, ['enqueueFrontend'], false ),
					get( value, ['enqueueAdmin'], false ),
				].includes( true ) )
					return 'Must be enqueued in frontend, admin or both';

				return true;
			},
			choices: [

				{
					name: 'name',
					message: 'Name',
					initial: getInitial( 'name', this ),
				},
				{
					name: 'script',
					message: 'Add script',
					initial: getInitial( 'script', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},
				{
					name: 'style',
					message: 'Add style',
					initial: getInitial( 'style', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},
				{
					name: 'enqueueFrontend',
					message: 'Enqueue in Frontend',
					initial: getInitial( 'enqueueFrontend', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},
				{
					name: 'enqueueAdmin',
					message: 'Enqueue in admin',
					initial: getInitial( 'enqueueAdmin', this ),
					format( input, choice ) {
						return formFormatBool( input, choice, {}, this );
					},
					result: formResultBool,
				},
			],

		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_assets;
