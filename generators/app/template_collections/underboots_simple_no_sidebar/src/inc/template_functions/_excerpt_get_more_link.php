<?php
/**
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( '<%= funcPrefix %>_excerpt_get_more_link' ) ) {
	/**
	 * Adds a custom read more link to all excerpts, manually or automatically generated
	 *
	 * @param string $post_excerpt Posts's excerpt.
	 *
	 * @return string
	 */
	function <%= funcPrefix %>_excerpt_get_more_link( $post_excerpt ) {
		if ( ! is_admin() ) {
			$post_excerpt = $post_excerpt . ' [...]<p><a class="btn btn-secondary <%= funcPrefix %>-read-more-link" href="' . esc_url( get_permalink( get_the_ID() ) ) . '">' . __( 'Read More...',
			'<%= textDomain %>' ) . '</a></p>';
		}
		return $post_excerpt;
	}
}
add_filter( 'wp_trim_excerpt', '<%= funcPrefix %>_excerpt_get_more_link' );
