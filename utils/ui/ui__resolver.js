'use strict';

const { prompt } = require('enquirer');

const ui__resolver = ( uiElementName, prompts ) => {
	return new Promise( ( resolve, reject ) => {
		resolve( prompt( prompts ) );
	} ).then( answers => {
		return {
			uiElementName,
			answers: answers,
		};
	} ).catch( e => {
		return {
			uiElementName,
		};
	} );

}

module.exports = ui__resolver;