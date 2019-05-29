'use strict';
const Generator = require('yeoman-generator');
const {
	startCase,
	snakeCase,
} = require('lodash');

const printUseApp = require( '../../utils/printUseApp' );
const addChange = require( '../../utils/addChange' );

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

		const {
			funcPrefix,
			assets: {
				script,
				style,
				name,
			},
		} = this.options.tplContext;

		addChange(
			this,
			'added',
			'Assets: ' + [
				script ? funcPrefix + '_script_' + name : '',
				style ? funcPrefix + '_style_' + name : '',
			].join(', ')
		);
	}

	install() {
		if ( this._shouldCancel() )
			return;
	}
};
