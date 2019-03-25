<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function <%= funcPrefix %>_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', '<%= funcPrefix %>_pingback_header' );