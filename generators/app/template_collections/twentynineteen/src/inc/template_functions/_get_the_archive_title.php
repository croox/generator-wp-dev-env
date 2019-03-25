<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Filters the default archive titles.
 */
function <%= funcPrefix %>_get_the_archive_title() {
	if ( is_category() ) {
		$title = __( 'Category Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . single_term_title( '', false ) . '</span>';
	} elseif ( is_tag() ) {
		$title = __( 'Tag Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . single_term_title( '', false ) . '</span>';
	} elseif ( is_author() ) {
		$title = __( 'Author Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . get_the_author_meta( 'display_name' ) . '</span>';
	} elseif ( is_year() ) {
		$title = __( 'Yearly Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . get_the_date( _x( 'Y', 'yearly archives date format', '<%= textDomain %>' ) ) . '</span>';
	} elseif ( is_month() ) {
		$title = __( 'Monthly Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . get_the_date( _x( 'F Y', 'monthly archives date format', '<%= textDomain %>' ) ) . '</span>';
	} elseif ( is_day() ) {
		$title = __( 'Daily Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . get_the_date() . '</span>';
	} elseif ( is_post_type_archive() ) {
		$title = __( 'Post Type Archives: ', '<%= textDomain %>' ) . '<span class="page-description">' . post_type_archive_title( '', false ) . '</span>';
	} elseif ( is_tax() ) {
		$tax = get_taxonomy( get_queried_object()->taxonomy );
		/* translators: %s: Taxonomy singular name */
		$title = sprintf( esc_html__( '%s Archives:', '<%= textDomain %>' ), $tax->labels->singular_name );
	} else {
		$title = __( 'Archives:', '<%= textDomain %>' );
	}
	return $title;
}
add_filter( 'get_the_archive_title', '<%= funcPrefix %>_get_the_archive_title' );