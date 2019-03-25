<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_posted_on' ) ) {
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function <%= funcPrefix %>_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		printf(
			'<span class="posted-on">%1$s<a href="%2$s" rel="bookmark">%3$s</a></span>',
			<%= funcPrefix %>\SVG_Icons::get_icon_svg( 'watch', 16 ),
			esc_url( get_permalink() ),
			$time_string
		);
	}
}