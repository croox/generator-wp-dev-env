<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_entry_footer' ) ) {
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function <%= funcPrefix %>_entry_footer() {

		// Hide author, post date, category and tag text for pages.
		if ( 'post' === get_post_type() ) {

			// Posted by
			<%= funcPrefix %>_posted_by();

			// Posted on
			<%= funcPrefix %>_posted_on();

			/* translators: used between list items, there is a space after the comma. */
			$categories_list = get_the_category_list( __( ', ', '<%= textDomain %>' ) );
			if ( $categories_list ) {
				printf(
					/* translators: 1: SVG icon. 2: posted in label, only visible to screen readers. 3: list of categories. */
					'<span class="cat-links">%1$s<span class="screen-reader-text">%2$s</span>%3$s</span>',
					<%= funcPrefix %>\SVG_Icons::get_icon_svg( 'archive', 16 ),
					__( 'Posted in', '<%= textDomain %>' ),
					$categories_list
				); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma. */
			$tags_list = get_the_tag_list( '', __( ', ', '<%= textDomain %>' ) );
			if ( $tags_list ) {
				printf(
					/* translators: 1: SVG icon. 2: posted in label, only visible to screen readers. 3: list of tags. */
					'<span class="tags-links">%1$s<span class="screen-reader-text">%2$s </span>%3$s</span>',
					<%= funcPrefix %>\SVG_Icons::get_icon_svg( 'tag', 16 ),
					__( 'Tags:', '<%= textDomain %>' ),
					$tags_list
				); // WPCS: XSS OK.
			}
		}

		// Comment count.
		if ( ! is_singular() ) {
			<%= funcPrefix %>_comment_count();
		}

		// Edit post link.
		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers. */
					__( 'Edit <span class="screen-reader-text">%s</span>', '<%= textDomain %>' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">' . <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'edit', 16 ),
			'</span>'
		);
	}
}