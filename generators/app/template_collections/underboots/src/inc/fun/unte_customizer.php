<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( 'unte_customizer' ) ) {
	/**
	 * Load Customizer customizations
	 */
	function unte_customizer() {

		// get out if not in customizer, prevents composer to autoload the class if unnecessary
		if ( ! is_customize_preview() )
			return;

		unte\Customizer::get_instance();
	}
}
unte_customizer();