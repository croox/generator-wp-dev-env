<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function <%= funcPrefix %>_body_classes( $classes ) {

	if ( is_singular() ) {
		// Adds `singular` to singular pages.
		$classes[] = 'singular';
	} else {
		// Adds `hfeed` to non singular pages.
		$classes[] = 'hfeed';
	}

	// Adds a class if image filters are enabled.
	if ( <%= funcPrefix %>_image_filters_enabled() ) {
		$classes[] = 'image-filters-enabled';
	}

	return $classes;
}
add_filter( 'body_class', '<%= funcPrefix %>_body_classes' );