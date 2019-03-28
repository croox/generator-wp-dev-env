const chalk = require( 'chalk' );

const formResultBoolString = function(value, choice) {
	return choice.value.length > 0 ? choice.value.startsWith(' ') ? true : choice.value.trim() : false;
};

module.exports = formResultBoolString;