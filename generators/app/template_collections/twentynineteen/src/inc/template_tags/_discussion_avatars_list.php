<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_discussion_avatars_list' ) ) {
	/**
	 * Displays a list of avatars involved in a discussion for a given post.
	 */
	function <%= funcPrefix %>_discussion_avatars_list( $comment_authors ) {
		if ( empty( $comment_authors ) ) {
			return;
		}
		echo '<ol class="discussion-avatar-list">', "\n";
		foreach ( $comment_authors as $id_or_email ) {
			printf(
				"<li>%s</li>\n",
				<%= funcPrefix %>_get_user_avatar_markup( $id_or_email )
			);
		}
		echo '</ol><!-- .discussion-avatar-list -->', "\n";
	}
}