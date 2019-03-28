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
					message: 'Based on WordPress Twentynineteen Theme.\n	See https://github.com/WordPress/twentynineteen',
				},
			],
		},
	];

	return ui__resolver( this.name, prompts );

};

module.exports = ui_themeBase;
