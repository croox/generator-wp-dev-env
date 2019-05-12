const chalk = require('chalk');
const ui__resolver = require('../../utils/ui/ui__resolver');

const ui_themeBase = function( self ){

	const prompts = [
		{
			name: 'themeBase',
			message: chalk.yellow( 'Choose theme base' ),
			type: 'select',
			choices: [
				{
					name: 'twentynineteen',
					message: [
						'Based on WordPress Twentynineteen Theme.',
						'	See https://github.com/WordPress/twentynineteen',
						'	Includes most of Twentynineteen\'s functionality, but may be not all.',
					].join( '\n' ),
				},
				{
					name: 'empty',
					message: [
						'Empty Theme',
						'	Useful to migrate other themes to wp-dev-env or developing new theme bases for the generator.',
						'	Contains just some placeholders for required theme files to be overwritten.',
					].join( '\n' ),
				},
			],
		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_themeBase;
