<?php
/**
 * Builds the comments form.
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Builds the comments form.
 *
 * @param string $args Arguments for form's fields.
 *
 * @return mixed
 */

if ( ! function_exists( 'unte_bootstrap_comment_form' ) ) {

	function unte_bootstrap_comment_form( $args ) {
		$args['comment_field'] = '<div class="form-group comment-form-comment">
	    <label for="comment">' . _x( 'Comment', 'noun', 'unte' ) . ( ' <span class="required">*</span>' ) . '</label>
	    <textarea class="form-control" id="comment" name="comment" aria-required="true" cols="45" rows="8"></textarea>
	    </div>';
		$args['class_submit']  = 'btn btn-secondary'; // since WP 4.1.
		return $args;
	}
} // endif function_exists( 'unte_bootstrap_comment_form' )
add_filter( 'comment_form_defaults', 'unte_bootstrap_comment_form' );