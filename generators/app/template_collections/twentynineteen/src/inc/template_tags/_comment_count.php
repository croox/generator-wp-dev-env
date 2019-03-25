<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_comment_count' ) ) {
	/**
	 * Prints HTML with the comment count for the current post.
	 */
	function <%= funcPrefix %>_comment_count() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			echo <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'comment', 16 );

			/* translators: %s: Name of current post. Only visible to screen readers. */
			comments_popup_link( sprintf( __( 'Leave a comment<span class="screen-reader-text"> on %s</span>', '<%= textDomain %>' ), get_the_title() ) );

			echo '</span>';
		}
	}
}