'use strict';
const Generator = require('yeoman-generator');
const {
	startCase,
	snakeCase,
} = require('lodash');
const chalk = require('chalk');
const printUseApp = require( '../../utils/printUseApp' );
const addChangeP = require( '../../utils/addChangeP' );
const chainCommandsAndFunctions = require( '../../utils/chainCommandsAndFunctions' );

const generate = require( './generate' );

module.exports = class extends Generator {
	printUseApp() { printUseApp( this ) }

	_shouldCancel() {
		return ! this.options.calledBy
			|| this.options.cancel
			|| 'assets' !== this.options.tplContext.type;
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
			funcPrefix,
			assets: {
				script,
				style,
				name,
			},
		} = this.options.tplContext;

		chainCommandsAndFunctions( [
			{
				func: addChangeP,
				args: [
					self,
					'added',
					'Assets: ' + [
						...( script ? [ funcPrefix + '_script_' + name ] : [] ),
						...( style ? [ funcPrefix + '_style_' + name ] : [] ),
					].join(', '),
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
