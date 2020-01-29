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
		newTplBlock.class_name = block.isAcfBlock
			? 'Block_Acf_' + startCase( newTplBlock.name ).replace( /\s/g, '_' )
			: 'Block_' + startCase( newTplBlock.name ).replace( /\s/g, '_' );

		this.options.tplContext.block = newTplBlock;
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
			block: {
				isAcfBlock,
				displayName,
			},
		} = self.options.tplContext;


		chainCommandsAndFunctions( [
			...( isAcfBlock ? [] : [
				{
					cmd: 'npm',
					args: [
						'install',
						'classnames',
						'--save-dev',
						...( self.options.verbose ? ['--verbose'] : [] ),
					],
				},
			] ),
			{
				func: addChangeP,
				args: [
					self,
					'added',
					'Block ' + displayName
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
