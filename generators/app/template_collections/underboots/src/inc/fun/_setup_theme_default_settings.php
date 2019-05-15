<?php
/**
 * Check and setup theme's default settings
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( '<%= funcPrefix %>_setup_theme_default_settings' ) ) {
	function <%= funcPrefix %>_setup_theme_default_settings() {

		// check if settings are set, if not set defaults.
		// Caution: DO NOT check existence using === always check with == .
		// Latest blog posts style.
		$<%= funcPrefix %>_posts_index_style = get_theme_mod( '<%= funcPrefix %>_posts_index_style' );
		if ( '' == $<%= funcPrefix %>_posts_index_style ) {
			set_theme_mod( '<%= funcPrefix %>_posts_index_style', 'default' );
		}

		// Sidebar position.
		$<%= funcPrefix %>_sidebar_position = get_theme_mod( '<%= funcPrefix %>_sidebar_position' );
		if ( '' == $<%= funcPrefix %>_sidebar_position ) {
			set_theme_mod( '<%= funcPrefix %>_sidebar_position', 'right' );
		}

		// Container width.
		$<%= funcPrefix %>_container_type = get_theme_mod( '<%= funcPrefix %>_container_type' );
		if ( '' == $<%= funcPrefix %>_container_type ) {
			set_theme_mod( '<%= funcPrefix %>_container_type', 'container' );
		}
	}
}
