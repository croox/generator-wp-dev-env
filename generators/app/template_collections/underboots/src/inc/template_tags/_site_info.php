<?php
/**
 * Display site info.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( '<%= funcPrefix %>_site_info' ) ) {

	/**
	 * Display site info.
	 *
	 * Adds site info hooks to WP hook library.
	 */
	function <%= funcPrefix %>_site_info() {

		do_action( '<%= funcPrefix %>_site_info_before' );

		$the_theme = wp_get_theme();

		$site_info = sprintf(
			'<a href="%1$s">%2$s</a><span class="sep"> | </span>%3$s(%4$s)',
			esc_url( __( 'http://wordpress.org/', '<%= textDomain %>' ) ),
			sprintf(
				/* translators:*/
				esc_html__( 'Proudly powered by %s', '<%= textDomain %>' ),
				'WordPress'
			),
			sprintf( // WPCS: XSS ok.
				/* translators:*/
				esc_html__( 'Theme: %1$s', '<%= textDomain %>' ),
				$the_theme->get( 'Name' )
			),
			sprintf( // WPCS: XSS ok.
				/* translators:*/
				esc_html__( 'Version: %1$s', '<%= textDomain %>' ),
				$the_theme->get( 'Version' )
			)
		);

		echo apply_filters( '<%= funcPrefix %>_site_info_content', $site_info ); // WPCS: XSS ok.

		do_action( '<%= funcPrefix %>_site_info_after' );
	}
}