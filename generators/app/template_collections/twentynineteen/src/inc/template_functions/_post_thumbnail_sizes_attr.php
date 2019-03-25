<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Add custom sizes attribute to responsive image functionality for post thumbnails.
 *
 * @origin TEST__mein_block 1.0
 *
 * @param array $attr  Attributes for the image markup.
 * @return string Value for use in post thumbnail 'sizes' attribute.
 */
function <%= funcPrefix %>_post_thumbnail_sizes_attr( $attr ) {

	if ( is_admin() ) {
		return $attr;
	}

	if ( ! is_singular() ) {
		$attr['sizes'] = '(max-width: 34.9rem) calc(100vw - 2rem), (max-width: 53rem) calc(8 * (100vw / 12)), (min-width: 53rem) calc(6 * (100vw / 12)), 100vw';
	}

	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', '<%= funcPrefix %>_post_thumbnail_sizes_attr', 10, 1 );
