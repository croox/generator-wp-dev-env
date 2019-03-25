<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Determines if post thumbnail can be displayed.
 */
function <%= funcPrefix %>_can_show_post_thumbnail() {
	return apply_filters( '<%= funcPrefix %>_can_show_post_thumbnail', ! post_password_required() && ! is_attachment() && has_post_thumbnail() );
}