<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * May be init composer package johnbillion/extended-cpts
 *
 */
function <%= funcPrefix %>_init_johnbillion_extended_cpts() {
	$path = <%= project_class %>::get_instance()->dir_path . 'vendor/johnbillion/extended-cpts/extended-cpts.php';
	if ( file_exists( $path ) ) {
		require_once $path;
	}
}
add_action( 'after_setup_theme', '<%= funcPrefix %>_init_johnbillion_extended_cpts' );
