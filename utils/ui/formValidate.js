const { snakeCase, find, get } = require('lodash');
const wpFeSanitizeTitle = require('../wpFeSanitizeTitle');

const formValidate = (value, state, options) => {
	const returns = [];

	options.skipValidate = options.skipValidate ? options.skipValidate : [];

	// Sanitized
	if (undefined !== options.sanitized) {
		[...options.sanitized].forEach((fieldName) => {
			if (undefined !== value[fieldName] && !options.skipValidate.includes(fieldName)) {
				const fieldMessage = get(
					find(state._choices, { name: fieldName }),
					['message'],
					''
				);
				if (wpFeSanitizeTitle(value[fieldName]) !== value[fieldName]) {
					returns.push(fieldMessage + ' is not sanitized!');
				}
			}
		});
	}

	// SnakeCase
	if (undefined !== options.snakeCase) {
		[...options.snakeCase].forEach((fieldName) => {
			if (undefined !== value[fieldName] && !options.skipValidate.includes(fieldName)) {
				const fieldMessage = get(
					find(state._choices, { name: fieldName }),
					['message'],
					''
				);
				if (snakeCase(value[fieldName]) !== value[fieldName]) {
					returns.push(fieldMessage + ' is not snakeCase!');
				}
			}
		});
	}

	// NotEmpty
	if (undefined !== options.notEmpty) {
		[...options.notEmpty].forEach((fieldName) => {
			if (undefined !== value[fieldName] && !options.skipValidate.includes(fieldName)) {
				const fieldMessage = get(
					find(state._choices, { name: fieldName }),
					['message'],
					''
				);
				if (value[fieldName].length === 0) {
					returns.push(fieldMessage + ' is empty!');
				}
			}
		});
	}

	return returns.length === 0 ? true : returns.join('\n');
};

module.exports = formValidate;
