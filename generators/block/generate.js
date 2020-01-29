const chalk = require('chalk');
const {
	uniq,
} = require('lodash');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');


const generate = self => {

	const { tplContext } = self.options;


	// console.log( '' );		// ??? debug
	// console.log( '' );		// ??? debug
	// console.log( 'debug tplContext' );		// ??? debug
	// console.log( tplContext );		// ??? debug
	// console.log( '' );		// ??? debug
	// console.log( '' );		// ??? debug


	const copyTpls = () => [
		...( tplContext.block.isAcfBlock ? [
			// php
			{
				src: 'src/inc/fun/_block.php',
				dest: 'src/inc/fun/' + tplContext.block.handle + '.php',
			},
			{
				src: 'src/classes/_acf_block.php',
				dest: 'src/classes/' + tplContext.block.class_name + '.php',
			},
			{
				src: 'src/template_parts/block/_content-acf-block.php',
				dest: 'src/template_parts/block/content-' + tplContext.block.name + '.php',
			},
		] : [
			// php
			{
				src: 'src/inc/fun/_block.php',
				dest: 'src/inc/fun/' + tplContext.block.handle + '.php',
			},
			{
				src: 'src/classes/_block.php',
				dest: 'src/classes/' + tplContext.block.class_name + '.php',
			},
			// js
			{
				src: 'src/js/_block_editor.js',
				dest: 'src/js/' + tplContext.block.handle + '_admin.js',
			},
			{
				src: 'src/js/_block_frontend.js',
				dest: 'src/js/' + tplContext.block.handle + '_frontend.js',
			},
			// scss
			{
				src: 'src/scss/_block_editor.scss',
				dest: 'src/scss/' + tplContext.block.handle + '_admin.scss',
			},
			{
				src: 'src/scss/_block_frontend.scss',
				dest: 'src/scss/' + tplContext.block.handle + '_frontend.scss',
			},
 		] ),
	].map( tpl => self.fs.copyTpl(
		self.templatePath( tpl.src ),
		self.destinationPath( tpl.dest ),
		tplContext
	) );

	copyTpls();

	// Return a promise.
	// But can't find a way to wait for mem-fs-editor to be done.
	// So the promise resolves directly. And whatever calls this function
	// has to handle it somehow and wait that all is done.
	return new Promise( resolve => resolve() );
};

module.exports = generate;
