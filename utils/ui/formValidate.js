const chalk = require('chalk');
const {
	snakeCase,
	find,
	get,
} = require('lodash');
const wpFeSanitizeTitle = require('../wpFeSanitizeTitle');

const formValidate = ( value, state, options ) => {
	let returns = [];

	options.skipValidate = options.skipValidate ? options.skipValidate : [];

	// sanitized
	if ( undefined !== options.sanitized ) {
		[...options.sanitized].map( fieldName => {
			if ( undefined !== value[fieldName] && ! options.skipValidate.includes( fieldName ) ) {
				const fieldMessage = get( find( state._choices, { name: fieldName } ), ['message'],'' );
				if ( wpFeSanitizeTitle( value[fieldName] ) !== value[fieldName] ) {
					returns.push( fieldMessage + ' is not sanitized!' );
				}
			}
		} );
	}

	// snakeCase
	if ( undefined !== options.snakeCase ) {
		[...options.snakeCase].map( fieldName => {
			if ( undefined !== value[fieldName] && ! options.skipValidate.includes( fieldName ) ) {
				const fieldMessage = get( find( state._choices, { name: fieldName } ), ['message'],'' );
				if ( snakeCase( value[fieldName] ) !== value[fieldName] ) {
					returns.push( fieldMessage + ' is not snakeCase!' );
				}
			}
		} );
	}

	// notEmpty
	if ( undefined !== options.notEmpty ) {
		[...options.notEmpty].map( fieldName => {
			if ( undefined !== value[fieldName] && ! options.skipValidate.includes( fieldName ) ) {
				const fieldMessage = get( find( state._choices, { name: fieldName } ), ['message'],'' );
				if ( value[fieldName].length === 0 ) {
					returns.push( fieldMessage + ' is empty!' );
				}
			}
		} );
	}

	return returns.length === 0 ? true : returns.join( '\n' );
};


module.exports = formValidate;