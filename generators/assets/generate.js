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

	// tplContext.assets
	// {
	// 	assets: {
	// 		name: 'test',
	// 		script: true,
	// 		style: true,
	// 		enqueueFrontend: true,
	// 		enqueueAdmin: true
	// 	},
	// },


	const copyTpls = () => [

		...( tplContext.assets.script ? [
			{
				src: 'src/inc/fun/_enqueue_script_.php',
				dest: 'src/inc/fun/' + tplContext.funcPrefix + '_enqueue_script_' + tplContext.assets.name + '.php',
			},
			{
				src: 'src/js/_script.js',
				dest: 'src/js/' + tplContext.funcPrefix + '_script_' + tplContext.assets.name + '.js',
			},
		] : [] ),

		...( tplContext.assets.style ? [
			{
				src: 'src/inc/fun/_enqueue_style_.php',
				dest: 'src/inc/fun/' + tplContext.funcPrefix + '_enqueue_style_' + tplContext.assets.name + '.php',
			},
			{
				src: 'src/scss/_style.scss',
				dest: 'src/scss/' + tplContext.funcPrefix + '_style_' + tplContext.assets.name + '.scss',
			},
		] : [] ),

	].map( tpl => self.fs.copyTpl(
		self.templatePath( tpl.src ),
		self.destinationPath( tpl.dest ),
		tplContext
	) );

	copyTpls();
};

module.exports = generate;
