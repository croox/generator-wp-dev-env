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
					name: 'underboots_simple_no_sidebar',
					message: [
						'Simplified based on UnderStrap',
						'	Mainly based on UnderStrap, but simplified layout without sidebars and widgets',
						'	"Combines Automattic´s Underscores Starter Theme and Bootstrap 4"',
						'	See https://github.com/understrap/understrap',
					].join( '\n' ),
				},
				{
					// https://github.com/understrap/understrap/commit/577eea7f47aeef222062b3bcea70718058acab87
					name: 'underboots',
					message: [
						'Mainly based on UnderStrap',
						'	"Combines Automattic´s Underscores Starter Theme and Bootstrap 4"',
						'	See https://github.com/understrap/understrap',
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
