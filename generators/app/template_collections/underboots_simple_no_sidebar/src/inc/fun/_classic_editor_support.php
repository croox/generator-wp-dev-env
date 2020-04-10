<?php
/**
 * Modify classic editor
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( '<%= funcPrefix %>_classic_editor_support' ) ) {
	function <%= funcPrefix %>_classic_editor_support( $current_screen ) {

		// get out if block editor, prevents composer to autoload the class if unnecessary
		if ( $current_screen->is_block_editor )
			return;

		<%= funcPrefix %>\Classic_Editor_Support::get_instance();
	}
}
add_action( 'current_screen', '<%= funcPrefix %>_classic_editor_support', 1 );
