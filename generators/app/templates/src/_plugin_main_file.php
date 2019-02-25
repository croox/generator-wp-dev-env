<?php
/**
 * <%= startCase( displayName + ' ' + projectTypeExplicit ) %> init
 *
 * @package <%= name %>
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

include_once( dirname( __FILE__ ) . '/vendor/croox/wp-dev-env-frame/classes/class-wde_project.php' );
include_once( dirname( __FILE__ ) . '/vendor/croox/wp-dev-env-frame/classes/class-wde_plugin.php' );

class <%= project_class %> extends Wde_Plugin {

}

function <%= funcPrefix %>_<%= snakeCase( name ) %>() {

	$init_args = array(
		'version'	=> 'wde_replace_version',
		'slug'	=> 'wde_replace_name',
		'name'	=> 'wde_replace_displayName',
		// 'parent'	=> 'wde_replace_template',	// ??? only childtheme
		'prefix'	=> 'wde_replace_funcPrefix',
		'FILE_CONST'	=> __FILE__,
		'db_version'	=> 0,
	);

	return <%= project_class %>::get_instance( $init_args );
}
<%= funcPrefix %>_<%= snakeCase( name ) %>();

?>