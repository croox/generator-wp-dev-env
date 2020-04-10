'use strict';
const Generator = require('yeoman-generator');
const {
	find,
	get,
} = require('lodash');
const chalk = require('chalk');
const childProcess = require('child_process');

const printUseApp = require( '../../utils/printUseApp' );
const addChangeP = require('../../utils/addChangeP');
const chainCommandsAndFunctions = require('../../utils/chainCommandsAndFunctions');
const getPackageConfigs = require('./getPackageConfigs');
const generate = require( './generate' );

module.exports = class extends Generator {
	printUseApp() { printUseApp( this ) }

	_shouldCancel() {
		return ! this.options.calledBy
			|| this.options.cancel
			|| 'composerPackage' !== this.options.tplContext.type;
	}

	writing() {

		if ( this._shouldCancel() )
			return;

		const done = this.async();

		generate( this ).then( () => done() );
	}

	install() {
		if ( this._shouldCancel() )
			return;

		const self = this;

		const {
			composerPkgs,
		} = this.options.tplContext

		if ( composerPkgs.length === 0 )
			return;

		const packageConfigs = getPackageConfigs( this.options.tplContext );

		chainCommandsAndFunctions( [
			{
				cmd: 'composer',
				args: [
					'require',
					...[...composerPkgs].map( composerPkg => {
						const packageConfig = find( packageConfigs, { 'key': composerPkg } );
						return composerPkg + ( get( packageConfig, ['version'] ) ? ':' + packageConfig.version : '' );
					} ),
					'--dev',
					...( self.options.verbose ? ['-vvv'] : [] ),
				],
			},
			{
				func: addChangeP,
				args: [
					self,
					'added',
					'Composer package'
						+ ( composerPkgs.length > 1 ? 's: ' : ': ' )
						+ [...composerPkgs].join(', ')
				],
			},
		], self ).then( result => {
			[
				'',
				chalk.green.bold( '✔ done' ),
			].map( str => self.log( str ) );
		} ).catch( err => self.log( err ) );

	}

};
