
const getPackageConfigs = tplContext => {

	const defaultInstallPath = 'vendor/{$vendor}/{$name}';

	const packageConfigs = [
		{
			key: 'daggerhart/wp-custom-menu-items',
			hint: 'Utility class for WordPress developers that allow for adding and modifying menu links dynamically within a plugin or theme.',
			version: 'dev-master',
			website: 'https://github.com/daggerhart/wp-custom-menu-items',
			templates: [
				{
					src: 'src/inc/fun/_nav_menu_items.php',
					dest: 'src/inc/fun/' + tplContext.funcPrefix + '_nav_menu_items.php',
				},
			],
			repository: {
				type: 'package',
				package: {
					name: 'daggerhart/wp-custom-menu-items',
					version: 'dev-master',
					source: {
						type: 'git',
						reference: 'master',
						url: 'https://github.com/daggerhart/wp-custom-menu-items.git'
					},
				},
			},
			autoload: '',
		},
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
			],
		},
		{
			key: 'jcchavezs/cmb2-conditionals',
			hint: 'Plugin to relate fields in a CMB2 metabox',
			installPath: defaultInstallPath,
			version: 'dev-master',
			website: 'https://github.com/jcchavezs/cmb2-conditionals',
			templates: [
				{
					src: 'src/inc/fun/_init_jcchavezs_cmb2_conditionals.php',
					dest: 'src/inc/fun/' + tplContext.funcPrefix + '_init_jcchavezs_cmb2_conditionals.php',
				},
			],
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
			],
		},
	];

	return packageConfigs;
};

module.exports = getPackageConfigs;
