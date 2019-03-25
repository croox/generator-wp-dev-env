<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Returns true if image filters are enabled on the theme options.
 */
function <%= funcPrefix %>_image_filters_enabled() {
	return 0 !== get_theme_mod( 'image_filter', 1 );
}
