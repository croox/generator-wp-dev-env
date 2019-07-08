const chalk = require('chalk');
const {
	uniq,
} = require('lodash');

const generate = self => {

	const { tplContext } = self.options;

	const copyTpls = () => [
		{
			src: 'src/inc/post_types_taxs/_add_cpt.php',
			dest: 'src/inc/post_types_taxs/' + tplContext.funcPrefix + '_add_cpt_' + tplContext.cpt.singularName + '.php',
		},
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
