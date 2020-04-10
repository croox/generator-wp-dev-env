'use strict';

const { prompt } = require('enquirer');


let lastUiElementName = '';
const ui__resolver = ( uiElementName, prompts ) => {
	return new Promise( ( resolve, reject ) => {
		resolve( prompt( prompts ) );
	} ).then( answers => {
		return {
			uiElementName,
			answers: answers,
		};
	} ).catch( e => {

		if ( lastUiElementName === uiElementName ) {
			process.exit();
		}
		lastUiElementName = uiElementName;

		return {
			uiElementName,
		};
	} );

}

module.exports = ui__resolver;
