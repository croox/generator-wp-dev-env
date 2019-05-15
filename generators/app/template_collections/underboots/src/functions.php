<?php
/**
 * <%= displayName %> Theme init
 *
 * @package <%= name %>
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

include_once( dirname( __FILE__ ) . '/vendor/autoload.php' );

function <%= funcPrefix %>_init() {

	$init_args = array(
		'version'	=> 'wde_replace_version',
		'slug'	=> 'wde_replace_name',
		'name'	=> 'wde_replace_displayName',
		'prefix'	=> 'wde_replace_funcPrefix',
		'textdomain'	=> 'wde_replace_textDomain',
		'FILE_CONST'	=> __FILE__,
		'db_version'	=> 0,
	);

	// see ./classes/Unte.php
	return <%= project_class %>::get_instance( $init_args );
}
<%= funcPrefix %>_init();

?>