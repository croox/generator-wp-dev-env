const chalk = require('chalk');
const {
	// startCase,
	find,
	get,
} = require('lodash');
const slugg = require('slugg');

const validateForm = ( value, state, options ) => {
	let returns = [];

	// shouldSlug
	if ( undefined !== options.shouldSlug ) {
		[...options.shouldSlug].map( fieldName => {
			if ( undefined !== value[fieldName] ) {
				const fieldMessage = get( find( state._choices, { name: fieldName } ), ['message'],'' );
				if ( slugg( value[fieldName] ) !== value[fieldName] ) {
					returns.push( fieldMessage + ' is not a slug!' );
				}
			}
		} );
	}

	// shouldNotEmpty
	if ( undefined !== options.shouldNotEmpty ) {
		[...options.shouldNotEmpty].map( fieldName => {
			if ( undefined !== value[fieldName] ) {
				const fieldMessage = get( find( state._choices, { name: fieldName } ), ['message'],'' );
				if ( value[fieldName].length === 0 ) {
					returns.push( fieldMessage + ' is empty!' );
				}
			}
		} );
	}

	return returns.length === 0 ? true : returns.join( '\n' );
};


module.exports = validateForm;