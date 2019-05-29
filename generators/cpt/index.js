'use strict';
const Generator = require('yeoman-generator');
const {
	startCase,
	snakeCase,
} = require('lodash');

const printUseApp = require( '../../utils/printUseApp' );
const addChange = require('../../utils/addChange');
const generate = require( './generate' );

module.exports = class extends Generator {
	printUseApp() { printUseApp( this ) }

	_shouldCancel() {
		return ! this.options.calledBy
			|| this.options.cancel
			|| 'cpt' !== this.options.tplContext.type;
	}

	writing() {

		if ( this._shouldCancel() )
			return;

		generate( this );

		const {
			funcPrefix,
			cpt: {
				singularName,
			},
		} = this.options.tplContext;

		addChange(
			this,
			'added',
			'Custom-post-type ' + funcPrefix + '_' + singularName
		);
	}

};
