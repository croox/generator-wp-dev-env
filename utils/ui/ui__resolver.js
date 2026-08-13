'use strict';

const { prompt } = require('enquirer');

let lastUiElementName = '';
const ui__resolver = (uiElementName, prompts) =>
	new Promise((resolve) => {
		resolve(prompt(prompts));
	})
		.then((answers) => ({
			uiElementName,
			answers,
		}))
		.catch(() => {
			if (lastUiElementName === uiElementName) {
				process.exit();
			}

			lastUiElementName = uiElementName;

			return {
				uiElementName,
			};
		});

module.exports = ui__resolver;
