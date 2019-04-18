<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * May be init composer package cmb2/cmb2
 *
 */
function <%= funcPrefix %>_init_cmb2_cmb2() {
	$path = <%= project_class %>::get_instance()->get_dir_path() . 'vendor/cmb2/cmb2/init.php';
	if ( file_exists( $path ) ) {
		require_once $path;
	}
}
add_action( 'after_setup_theme', '<%= funcPrefix %>_init_cmb2_cmb2', 1 );
