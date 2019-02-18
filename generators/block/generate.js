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
				src: 'src/inc/fun/_class-acf_block.php',
				dest: 'src/inc/fun/class-' + tplContext.block.handle + '.php',
			},
			{
				src: 'src/template_parts/block/_content-acf-block.php',
				dest: 'src/template_parts/block/content-' + tplContext.block.name + '.php',
			},
		] : [
			// php
			{
				src: 'src/inc/fun/_class-block.php',
				dest: 'src/inc/fun/class-' + tplContext.block.handle + '.php',
			},
			// js
			{
				src: 'src/js/_block_editor.js',
				dest: 'src/js/' + tplContext.block.handle + '_editor.js',
			},
			{
				src: 'src/js/_block_frontend.js',
				dest: 'src/js/' + tplContext.block.handle + '_frontend.js',
			},
			// scss
			{
				src: 'src/scss/_block_editor.scss',
				dest: 'src/scss/' + tplContext.block.handle + '_editor.scss',
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
};

module.exports = generate;
