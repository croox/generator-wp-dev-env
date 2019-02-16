'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
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
			|| 'block' !== this.options.tplContext.type;
	}

	extendTplContext() {

		const {
			tplContext: {
				block,
				funcPrefix,
			},
		} = this.options;

		const newTplBlock = {
			...block,
			handle: block.isAcfBlock
				? funcPrefix + '_acf_block_' + snakeCase( block.name )
				: funcPrefix + '_block_' + snakeCase( block.name ),
		};
		newTplBlock.class_name = startCase( newTplBlock.handle ).replace( / /g, '_' );

		this.options.tplContext.block = newTplBlock;

	}

	writing() {
		if ( this._shouldCancel() )
			return;

		generate( this );
	}

	install() {
		if ( this._shouldCancel() )
			return;

		this.npmInstall( [
			'classnames',
		], { 'save-dev': true } );

	}
};
