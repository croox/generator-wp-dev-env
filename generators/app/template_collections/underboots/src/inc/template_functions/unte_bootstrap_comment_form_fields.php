<?php
/**
 * Creates the comments form.
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'unte_bootstrap_comment_form_fields' ) ) {
	/**
	 * Creates the comments form.
	 *
	 * @param string $fields Form fields.
	 *
	 * @return array
	 */
	function unte_bootstrap_comment_form_fields( $fields ) {
		$commenter = wp_get_current_commenter();
		$req       = get_option( 'require_name_email' );
		$aria_req  = ( $req ? " aria-required='true'" : '' );
		$html5     = current_theme_supports( 'html5', 'comment-form' ) ? 1 : 0;
		$consent  = empty( $commenter['comment_author_email'] ) ? '' : ' checked="checked"';
		$fields    = array(
			'author'  => '<div class="form-group comment-form-author"><label for="author">' . __( 'Name',
					'unte' ) . ( $req ? ' <span class="required">*</span>' : '' ) . '</label> ' .
			            '<input class="form-control" id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . '></div>',
			'email'   => '<div class="form-group comment-form-email"><label for="email">' . __( 'Email',
					'unte' ) . ( $req ? ' <span class="required">*</span>' : '' ) . '</label> ' .
			            '<input class="form-control" id="email" name="email" ' . ( $html5 ? 'type="email"' : 'type="text"' ) . ' value="' . esc_attr( $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . '></div>',
			'url'     => '<div class="form-group comment-form-url"><label for="url">' . __( 'Website',
					'unte' ) . '</label> ' .
			            '<input class="form-control" id="url" name="url" ' . ( $html5 ? 'type="url"' : 'type="text"' ) . ' value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30"></div>',
			'cookies' => '<div class="form-group form-check comment-form-cookies-consent"><input class="form-check-input" id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"' . $consent . ' /> ' .
			         '<label class="form-check-label" for="wp-comment-cookies-consent">' . __( 'Save my name, email, and website in this browser for the next time I comment', 'unte' ) . '</label></div>',
		);

		return $fields;
	}
} // endif function_exists( 'unte_bootstrap_comment_form_fields' )

// Comments form.
add_filter( 'comment_form_default_fields', 'unte_bootstrap_comment_form_fields' );