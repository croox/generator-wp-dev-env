<?php
/**
 * Modify classic editor
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'unte_classic_editor_support' ) ) {
	function unte_classic_editor_support( $current_screen ) {

		// get out if block editor, prevents composer to autoload the class if unnecessary
		if ( $current_screen->is_block_editor )
			return;

		unte\Classic_Editor_Support::get_instance();
	}
}
add_action( 'current_screen', 'unte_classic_editor_support', 1 );
