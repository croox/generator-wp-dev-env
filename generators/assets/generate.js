const chalk = require('chalk');
const {
	uniq,
} = require('lodash');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');


const generate = self => {

	const { tplContext } = self.options;

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

	].map( tpl => {
		self.fs.copyTpl(
			self.templatePath( tpl.src ),
			self.destinationPath( tpl.dest ),
			tplContext
		);
	} );

	copyTpls();

	// Return a promise.
	// But can't find a way to wait for mem-fs-editor to be done.
	// So the promise resolves directly. And whatever calls this function
	// has to handle it somehow and wait that all is done.
	return new Promise( resolve => resolve() );
};

module.exports = generate;
