
const getPackageConfigs = tplContext => {

	const defaultInstallPath = 'vendor/{$vendor}/{$name}';

	const packageConfigs = [
		{
			key: 'cmb2/cmb2',
			hint: 'CMB2 is a developer’s toolkit for building metaboxes, \n\tcustom fields, and forms for WordPress that will blow your mind.',
			installPath: defaultInstallPath,
			website: 'http://cmb2.io/',
			templates: [
				{
					src: 'src/inc/fun/_init_cmb2_cmb2.php',
					dest: 'src/inc/fun/' + tplContext.funcPrefix + '_init_cmb2_cmb2.php',
				},
				{
					src: 'grunt/hooked/addCmb2CopyTask.js',
					dest: 'grunt/hooked/addCmb2CopyTask.js',
				},
			],
		},
		{
			key: 'jcchavezs/cmb2-conditionals',
			hint: 'Plugin to relate fields in a CMB2 metabox',
			installPath: defaultInstallPath,
			version: 'dev-master',
s			website: 'https://github.com/jcchavezs/cmb2-conditionals',
			templates: [
				{
					src: 'src/inc/fun/_init_jcchavezs_cmb2_conditionals.php',
					dest: 'src/inc/fun/' + tplContext.funcPrefix + '_init_jcchavezs_cmb2_conditionals.php',
				},
				{
					src: 'grunt/hooked/addCmb2ConditionalsCopyTask.js',
					dest: 'grunt/hooked/addCmb2ConditionalsCopyTask.js',
				},
			],
			repository: {
				"type": "vcs",
				"url": "https://github.com/jcchavezs/cmb2-conditionals"
			},
		},
		{
			key: 'johnbillion/extended-cpts',
			hint: 'Extended CPTs is a library which provides extended functionality\n\tto WordPress custom post types and taxonomies.',
			website: 'https://github.com/johnbillion/extended-cpts/',
			templates: [
				{
					src: 'src/inc/fun/_init_johnbillion_extended_cpts.php',
					dest: 'src/inc/fun/' + tplContext.funcPrefix + '_init_johnbillion_extended_cpts.php',
				},
				{
					src: 'grunt/hooked/addExtendedCptsCopyTask.js',
					dest: 'grunt/hooked/addExtendedCptsCopyTask.js',
				},
			],
		},
	];

	return packageConfigs;
};

module.exports = getPackageConfigs;
