const chalk = require('chalk');
const {
	get,
} = require('lodash');
const { prompt } = require('enquirer');

const ui__resolver = require('../../utils/ui/ui__resolver');

const ui_chooseType = function( self ){

	const prompts = [
		{
			name: 'type',
			message: chalk.yellow( 'What do you want to generate' ),
			type: 'select',
			initial: get( self.props.answers, ['type'], null ),


			choices: [
				...( self.props.isNewProject ? [
					{
						name: 'plugin',
						message: 'Generate Plugin',
					},
					{
						name: 'theme',
						message: 'Generate Theme',
					},
					{
						name: 'childtheme',
						message: 'Generate Childtheme',
					},
				] : [
					{
						name: 'assets',
						message: 'Assets',
					},
					{
						name: 'cpt',
						message: 'Custom Post Type',
					},
					// ??? repair
					// {
					// 	name: 'block',
					// 	message: 'Gutenberg Block',
					// },
					{
						name: 'composerPackage',
						message: 'Composer Package',
					},
					{
						name: 'updateWde',
						message: 'Regenerate project into ' + chalk.bgBlack( 'generated' ) + ' branch',
					},
				]),
			],
		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_chooseType;
