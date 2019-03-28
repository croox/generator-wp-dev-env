const chalk = require( 'chalk' );
const {
	isBoolean,
} = require('lodash');

const formFormatBoolString = function( input, choice ) {

	let { success } = this.styles;

	if ( choice.value === choice.name && choice.input.length === 0 ) {
		if ( isBoolean( choice.initial ) ) {
			if ( choice.initial ) {
				choice.value = ' ';
				choice.input = ' ';
			} else {
				choice.value = '';
				choice.input = '';
			}
		} else {
			choice.value = choice.initial;
			choice.input = choice.initial;
		}
	}

	if ( choice.input.length === 0 ) {
		choice.value = '';
		return chalk.red.bold('x');
	} else {
		if ( choice.input.startsWith(' ') ) {
			choice.cursor = 0;
			if ( choice.input.length === 1 ) {
				choice.input = ' ';
				input = ' ';
				choice.value = ' ';
				return chalk.bold(success('✔') );
			} else {
				choice.input = '';
				input = '';
				choice.value = '';
				return chalk.red.bold('x');
			}
		}

		input = input.trim();
		choice.value = choice.value.trim();
		return choice.input.trim();
	}
};

module.exports = formFormatBoolString;