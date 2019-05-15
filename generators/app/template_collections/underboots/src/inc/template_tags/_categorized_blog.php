<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
if ( ! function_exists( '<%= funcPrefix %>_categorized_blog' ) ) {
	function <%= funcPrefix %>_categorized_blog() {
		if ( false === ( $all_the_cool_cats = get_transient( '<%= funcPrefix %>_categories' ) ) ) {
			// Create an array of all the categories that are attached to posts.
			$all_the_cool_cats = get_categories( array(
				'fields'     => 'ids',
				'hide_empty' => 1,
				// We only need to know if there is more than one category.
				'number'     => 2,
			) );
			// Count the number of categories that are attached to the posts.
			$all_the_cool_cats = count( $all_the_cool_cats );
			set_transient( '<%= funcPrefix %>_categories', $all_the_cool_cats );
		}
		if ( $all_the_cool_cats > 1 ) {
			// This blog has more than 1 category so components_categorized_blog should return true.
			return true;
		} else {
			// This blog has only 1 category so components_categorized_blog should return false.
			return false;
		}
	}
}

/**
 * Flush out the transients used in <%= funcPrefix %>_categorized_blog.
 */
add_action( 'edit_category', '<%= funcPrefix %>_category_transient_flusher' );
add_action( 'save_post',     '<%= funcPrefix %>_category_transient_flusher' );

if ( ! function_exists( '<%= funcPrefix %>_category_transient_flusher' ) ) {
	function <%= funcPrefix %>_category_transient_flusher() {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		// Like, beat it. Dig?
		delete_transient( '<%= funcPrefix %>_categories' );
	}
}
