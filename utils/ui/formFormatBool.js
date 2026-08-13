const chalk = require('chalk');
const { isBoolean } = require('lodash');

const formFormatBool = function (input, choice, options, self) {
	self = self ? self : this;

	choice.input = '';
	choice.cursor = 0;

	const { success } = self.styles;

	const check = () =>
		choice.enabled
			? options.msgEnabled
				? options.msgEnabled
				: chalk.bold(success('✔'))
			: options.msgDisabled
				? options.msgDisabled
				: chalk.red.bold('x');

	if (choice.value === choice.name && choice.input.length === 0) {
		if (isBoolean(choice.initial)) {
			choice.value = choice.initial;
			choice.input = choice.initial;
			choice.enabled = choice.initial;
		}
	} else {
		if (input !== ' ') {
			self.alert();
			return check();
		}

		choice.enabled = !choice.enabled;
	}

	return check();
};

module.exports = formFormatBool;
