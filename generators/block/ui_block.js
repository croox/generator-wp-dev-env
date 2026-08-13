'use strict';
const chalk = require('chalk');
const { startCase, get } = require('lodash');
const figlet = require('figlet');

const ui__resolver = require('../../utils/ui/ui__resolver');
const wpFeSanitizeTitle = require('../../utils/wpFeSanitizeTitle');
const formValidate = require('../../utils/ui/formValidate');

const ui_block = function (self) {
	console.log(
		chalk.green(
			figlet.textSync('Block', {
				font: 'Ogre',
				horizontalLayout: 'fitted',
				verticalLayout: 'fitted',
			})
		)
	);

	const getInitial = (choiceName, prompt) => {
		switch (choiceName) {
			case 'displayName':
				return get(prompt, ['values', 'name'], false)
					? startCase(prompt.values.name.replace(/-/g, ' '))
					: '';

			case 'name':
				return get(prompt, ['values', 'displayName'], false)
					? wpFeSanitizeTitle(prompt.values.displayName)
					: '';

			default:
				break;
		}
	};

	const prompts = [
		{
			name: 'block',
			message: chalk.yellow('Add new gutenberg block'),
			type: 'form',
			initial: get(self.props.answers, ['setup'], null),
			validate(value, state, _field) {
				return formValidate(value, state, {
					sanitized: ['name'],
					notEmpty: ['name', 'displayName'],
				});
			},
			choices: [
				{
					name: 'name',
					message: 'Slugified Block Name',
					initial: getInitial('name', this),
					onChoice(state, choice, _i) {
						choice.initial = getInitial('name', this);
					},
				},

				{
					name: 'displayName',
					message: 'Block Display Name',
					initial: getInitial('displayName', this),
					onChoice(state, choice, _i) {
						choice.initial = getInitial('displayName', this);
					},
				},

				// {
				// 	name: 'isAcfBlock',
				// 	message: 'Is ACF Block (Experimental, not tested)',
				// 	format(input, choice) {
				// 		choice.input = '';
				// 		choice.cursor = 0;
				// 		let { success } = this.styles;
				// 		let check = () => choice.enabled ? chalk.bold(success('✔')) : chalk.red.bold('x');
				// 		if (input !== ' ') {
				// 			this.alert();
				// 			return check();
				// 		}
				// 		choice.enabled = !choice.enabled;
				// 		return check();
				// 	},
				// 	result(value, choice) {
				// 		return choice.enabled;
				// 	}
				// },
			],
		},
	];

	return ui__resolver(this.name, prompts);
};

module.exports = ui_block;
