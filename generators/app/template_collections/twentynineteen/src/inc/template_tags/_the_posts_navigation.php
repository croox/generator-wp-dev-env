<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_the_posts_navigation' ) ) {
	/**
	 * Documentation for function.
	 */
	function <%= funcPrefix %>_the_posts_navigation() {
		the_posts_pagination(
			array(
				'mid_size'  => 2,
				'prev_text' => sprintf(
					'%s <span class="nav-prev-text">%s</span>',
					<%= funcPrefix %>\SVG_Icons::get_icon_svg( 'chevron_left', 22 ),
					__( 'Newer posts', '<%= textDomain %>' )
				),
				'next_text' => sprintf(
					'<span class="nav-next-text">%s</span> %s',
					__( 'Older posts', '<%= textDomain %>' ),
					<%= funcPrefix %>\SVG_Icons::get_icon_svg( 'chevron_right', 22 )
				),
			)
		);
	}
}