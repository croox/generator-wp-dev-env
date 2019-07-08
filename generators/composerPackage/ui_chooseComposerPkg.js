'use strict';

const chalk = require('chalk');
const {
	get,
	union,
	has,
} = require('lodash');
const figlet = require('figlet');
const { prompt } = require('enquirer');
const path = require( 'path' );

const getDestPkg = require( '../../utils/getDestPkg' );
const ui__resolver = require('../../utils/ui/ui__resolver');
const getPackageConfigs = require('./getPackageConfigs');

const ui_chooseComposerPkg = function( self ){

	console.log( chalk.green( figlet.textSync( 'Composer Pkg', {
		font: 'Ogre',
		horizontalLayout: 'fitted',
		verticalLayout: 'fitted'
	} ) ) );

	const destPkg = getDestPkg( self );

	let composerJson = self.fs.readJSON( self.destinationPath( 'composer.json' ) );

	const installedPkgs = union(
		Object.keys( get( composerJson, ['require'], {} ) ),
		Object.keys( get( composerJson, ['require-dev'], {} ) )
	);

	const packageConfigs = getPackageConfigs( destPkg );

	const prompt = {
		type: 'multiselect',
		hint: 'Use space to select',
		name: 'composerPkgs',
		message: 'Choose Packages',
		choices: [],
	};

	[...packageConfigs].map( packageConfig => {

		const hint = ['hint','website'].reduce( ( acc, key ) => {
			if ( has( packageConfig, [key] ) ) {
				let appendStr = '';
				switch( key ) {
					case 'website':
						appendStr = chalk.italic( packageConfig[key] );
						break;
					default:
						appendStr = packageConfig[key];
				}
				return acc + '\n\t' + appendStr
			}
			return acc + '';
		}, '' );

		const newChoice = {
			name: packageConfig.key,
			message: installedPkgs.includes( packageConfig.key ) ? chalk.dim( packageConfig.key + ' (already installed)' ) : chalk.bold( packageConfig.key ),
			...( hint.length > 0 && { hint: installedPkgs.includes( packageConfig.key ) ? chalk.dim( hint ) : hint } ),
		};

		prompt.choices = [
			...prompt.choices,
			newChoice,
		];

	} );

	return ui__resolver( this.name, [prompt] );

};

module.exports = ui_chooseComposerPkg;
