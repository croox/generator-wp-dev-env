<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Returns the size for avatars used in the theme.
 */
function <%= funcPrefix %>_get_avatar_size() {
	return 60;
}