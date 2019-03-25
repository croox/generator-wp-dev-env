<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Adds custom class to the array of posts classes.
 */
function <%= funcPrefix %>_post_classes( $classes, $class, $post_id ) {
	$classes[] = 'entry';

	return $classes;
}
add_filter( 'post_class', '<%= funcPrefix %>_post_classes', 10, 3 );