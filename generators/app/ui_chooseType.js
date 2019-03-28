const chalk = require('chalk');
const {
	get,
} = require('lodash');
const { prompt } = require('enquirer');

const ui__resolver = require('../../utils/ui/ui__resolver');
const getDestPkg = require('../../utils/getDestPkg');

const ui_chooseType = function( self ){

	const destPkg = getDestPkg( self );

	const prompts = [
		{
			name: 'type',
			message: chalk.yellow( 'What do you want to generate' ),
			type: 'select',
			initial: get( self.props.answers, ['type'], null ),


			choices: [
				...( destPkg ? [
					{
						name: 'cpt',
						message: 'Custom Post Type',
					},
					{
						name: 'block',
						message: 'Gutenberg Block',
					},
				] : [
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
				] ),
			],
		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_chooseType;
