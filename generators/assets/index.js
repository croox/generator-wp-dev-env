'use strict';
const Generator = require('yeoman-generator');
const {
	startCase,
	snakeCase,
} = require('lodash');

const printUseApp = require( '../../utils/printUseApp' );

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

		generate( this );
	}

	install() {
		if ( this._shouldCancel() )
			return;
	}
};
