<?php
/**
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'unte_adjust_body_class' ) ) {
	/**
	 * Setup body classes.
	 *
	 * @param array $classes Classes for the body element.
	 *
	 * @return mixed
	 */
	function unte_adjust_body_class( $classes ) {

		foreach ( $classes as $key => $value ) {
			if ( 'tag' == $value ) {
				unset( $classes[ $key ] );
			}
		}

		return $classes;

	}
}
// Removes tag class from the body_class array to avoid Bootstrap markup styling issues.
add_filter( 'body_class', 'unte_adjust_body_class' );
