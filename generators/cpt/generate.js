const chalk = require('chalk');
const {
	uniq,
} = require('lodash');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');


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
};

module.exports = generate;
