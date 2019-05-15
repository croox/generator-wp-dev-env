<?php
/**
 * Check and setup theme's default settings
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'unte_setup_theme_default_settings' ) ) {
	function unte_setup_theme_default_settings() {

		// check if settings are set, if not set defaults.
		// Caution: DO NOT check existence using === always check with == .
		// Latest blog posts style.
		$unte_posts_index_style = get_theme_mod( 'unte_posts_index_style' );
		if ( '' == $unte_posts_index_style ) {
			set_theme_mod( 'unte_posts_index_style', 'default' );
		}

		// Sidebar position.
		$unte_sidebar_position = get_theme_mod( 'unte_sidebar_position' );
		if ( '' == $unte_sidebar_position ) {
			set_theme_mod( 'unte_sidebar_position', 'right' );
		}

		// Container width.
		$unte_container_type = get_theme_mod( 'unte_container_type' );
		if ( '' == $unte_container_type ) {
			set_theme_mod( 'unte_container_type', 'container' );
		}
	}
}
