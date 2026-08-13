const chalk = require('chalk');
const figlet = require('figlet');
const semver = require('semver');
const { startCase, kebabCase, get } = require('lodash');
const path = require('path');

const ui__resolver = require('../../utils/ui/ui__resolver');
const wpFeSanitizeTitle = require('../../utils/wpFeSanitizeTitle');
const formValidate = require('../../utils/ui/formValidate');

const ui_setup = function (self) {
	console.log(
		chalk.green(
			figlet.textSync(get(self.props.answers, ['type'], 'Setup'), {
				font: 'Ogre',
				horizontalLayout: 'fitted',
				verticalLayout: 'fitted',
			})
		)
	);

	const skipValidate = get(self.options, ['skipValidate'], '').split(',');

	const getChoiceInput = (prompt, key, fallback) => {
		fallback = fallback ? fallback : '';
		const choice =
			undefined === prompt
				? undefined
				: prompt.state._choices.find((_choice) => key === _choice.name);
		if (choice && choice.input && choice.input.length > 0) {
			return choice.input;
		}

		return get(prompt, ['values', key], fallback);
	};

	const getInitial = (choiceName, _prompt) => {
		switch (choiceName) {
			case 'author':
				return 'example'; /// ??? get initial, remember

			case 'name':
				return skipValidate.includes('name')
					? path.basename(process.cwd())
					: wpFeSanitizeTitle(path.basename(process.cwd()));

			case 'wpRequiresAtLeast':
				return '5.0.0';

			case 'wpVersionTested':
				return '6.3.0';

			case 'phpRequiresAtLeast':
				return '8.0.0';

			default:
				break;
		}
	};

	const projectType = get(self.props.answers, ['type'], '') === 'plugin' ? 'plugin' : 'theme';
	const projectTypeExplicit = get(self.props.answers, ['type'], '');
	const projectTypeExplicitSC = startCase(projectTypeExplicit);

	const prompts = [
		{
			name: 'setup',
			message: [
				chalk.yellow('Setup ' + projectTypeExplicitSC),
				'',
				'🡡	Navigate up.',
				'🡣	Navigate down.',
				'tab	Use initial value and maybe edit it.',
				'↲	Submit. ' +
					chalk.red.dim(
						'Bug: before submit, press multible 🡡 🡣 until all inital values updated!'
					),
				'',
			].join('\n'),
			type: 'form',
			initial: get(self.props.answers, ['setup'], null),
			validate(value, state, _field) {
				const formValidation = formValidate(value, state, {
					skipValidate,
					sanitized: [
						'funcPrefix',
						'textDomain',
						'name',
						...(projectTypeExplicit === 'childtheme' ? ['template'] : []),
					],
					snakeCase: ['funcPrefix', 'textDomain'],
					notEmpty: [
						'name',
						'displayName',
						...(projectTypeExplicit === 'childtheme' ? ['template'] : []),
						'description',
						'author',
						'authorUri',
						'repositoryUri',
						'uri',
						'tags',
						'funcPrefix',
						'textDomain',
						'wpRequiresAtLeast',
						'wpVersionTested',
						'phpRequiresAtLeast',
					],
				});
				if (formValidation !== true) return formValidation;

				if (semver.compare(value.wpRequiresAtLeast, value.wpVersionTested) > 0)
					return "Required wp version can't be higher then tested wp verison";

				return true;
			},
			choices: [
				{
					name: 'name',
					message: 'Sanitized Name',
					initial: getInitial('name'),
					onChoice(state, choice, _i) {
						choice.initial = getInitial('name', this);
					},
				},

				{
					name: 'displayName',
					message: 'Display Name',
					onChoice(state, choice, _i) {
						const name = getChoiceInput(this, 'name', getInitial('name', this));
						choice.initial = startCase(name.replace(/[-_]/g, ' '));
					},
				},

				...(projectTypeExplicit === 'childtheme'
					? [
							{
								name: 'template',
								message: 'Parent Theme (template)',
							},
						]
					: []),

				{
					name: 'description',
					message: projectTypeExplicitSC + ' Description',
					initial: 'Example Description',
				},

				{
					name: 'author',
					message: 'Author',
					initial: getInitial('author'),
				},

				{
					name: 'authorUri',
					message: 'Author Uri',
					onChoice(state, choice, _i) {
						const author = getChoiceInput(this, 'author', getInitial('author', this));
						choice.initial = 'https://github.com/' + author;
					},
				},

				{
					name: 'repositoryUri',
					message: 'Repository URL',
					onChoice(state, choice, _i) {
						const author = getChoiceInput(this, 'author', getInitial('author', this));
						const name = getChoiceInput(this, 'name', getInitial('name', this));
						choice.initial = 'https://github.com/' + author + '/' + name;
					},
				},

				{
					name: 'uri',
					message: startCase(projectType) + ' URL',
					onChoice(state, choice, _i) {
						const name = getChoiceInput(this, 'name', getInitial('name', this));
						const authorUri = getChoiceInput(this, 'authorUri');
						const author = getChoiceInput(this, 'author', getInitial('author', this));
						choice.initial = authorUri.length
							? authorUri + '/' + name
							: 'https://github.com/' + author + '/' + name;
					},
				},

				{
					name: 'donateLink',
					message: 'Donate Link',
					onChoice(state, choice, _i) {
						const name = getChoiceInput(this, 'name', getInitial('name', this));
						const authorUri = getChoiceInput(this, 'authorUri');
						const author = getChoiceInput(this, 'author', getInitial('author', this));
						choice.initial = authorUri.length
							? authorUri + '/donate'
							: 'https://github.com/' + author + '/' + name;
					},
				},

				{
					name: 'tags',
					message: 'Comma Separated Tags',
				},

				{
					name: 'funcPrefix',
					message: 'Function Prefix',
					onChoice(state, choice, _i) {
						let name = getChoiceInput(this, 'name', getInitial('name', this));
						name = kebabCase(name);
						const nameParts = name.split('-');
						switch (true) {
							case nameParts.length === 1:
								choice.initial = name.replace(/-/, '').substring(0, 4);
								return;
							case nameParts.length === 2:
								choice.initial = [...nameParts]
									.map((part) => part.substring(0, 2))
									.slice(0, 2)
									.join('');
								return;
							case nameParts.length >= 3:
								choice.initial = [...nameParts]
									.map((part) => part.substring(0, 1))
									.slice(0, 4)
									.join('');
								break;
							default:
								break;
						}
					},
				},

				{
					name: 'textDomain',
					message: 'Text Domain',
					onChoice(state, choice, _i) {
						const funcPrefix = getChoiceInput(
							this,
							'funcPrefix',
							getInitial('funcPrefix', this)
						);
						choice.initial = funcPrefix;
					},
				},

				{
					name: 'wpRequiresAtLeast',
					message: 'WP Requires At Least',
					initial: getInitial('wpRequiresAtLeast'),
				},

				{
					name: 'wpVersionTested',
					message: 'WP Version Tested',
					onChoice(state, choice, _i) {
						choice.initial =
							this.values.wpRequiresAtLeast &&
							semver.valid(this.values.wpRequiresAtLeast)
								? semver.compare(
										this.values.wpRequiresAtLeast,
										getInitial('wpVersionTested')
									) === 1
									? this.values.wpRequiresAtLeast
									: getInitial('wpVersionTested')
								: getInitial('wpVersionTested');
					},
				},

				{
					name: 'phpRequiresAtLeast',
					message: 'PHP Requires At Least',
					initial: getInitial('phpRequiresAtLeast'),
				},
			],
		},
	];

	return ui__resolver(this.name, prompts);
};

module.exports = ui_setup;
