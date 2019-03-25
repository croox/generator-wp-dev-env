<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_comment_form' ) ) {
	/**
	 * Documentation for function.
	 */
	function <%= funcPrefix %>_comment_form( $order ) {
		if ( true === $order || strtolower( $order ) === strtolower( get_option( 'comment_order', 'asc' ) ) ) {

			comment_form(
				array(
					'logged_in_as' => null,
					'title_reply'  => null,
				)
			);
		}
	}
}