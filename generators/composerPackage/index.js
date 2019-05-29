'use strict';
const Generator = require('yeoman-generator');
const {
	find,
	get,
} = require('lodash');
const chalk = require('chalk');
const childProcess = require('child_process');

const printUseApp = require( '../../utils/printUseApp' );
const addChange = require('../../utils/addChange');
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

		generate( this );
	}

	install() {
		if ( this._shouldCancel() )
			return;


		const {
			composerPkgs,
		} = this.options.tplContext

		if ( composerPkgs.length === 0 )
			return;

		const packageConfigs = getPackageConfigs( this.options.tplContext );

		let cmd = [
			'composer require',
			...[...composerPkgs].map( composerPkg => {
				const packageConfig = find( packageConfigs, { 'key': composerPkg } );
				return composerPkg + ( get( packageConfig, ['version'] ) ? ':' + packageConfig.version : '' );
			} ),
			'--dev',
		].join( ' ' );

		this.log('');
		this.log( chalk.green( 'running ' ) + chalk.yellow( cmd ) );
		this.log('');
		childProcess.execSync( cmd, { stdio:'inherit' } );

		addChange(
			this,
			'added',
			'Composer package'
				+ composerPkgs.length > 1 ? 's: ' : ': '
				+ [...composerPkgs].join(', ')
		);

	}


};
