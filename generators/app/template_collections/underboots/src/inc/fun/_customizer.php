<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( '<%= funcPrefix %>_customizer' ) ) {
	/**
	 * Load Customizer customizations
	 */
	function <%= funcPrefix %>_customizer() {

		// get out if not in customizer, prevents composer to autoload the class if unnecessary
		if ( ! is_customize_preview() )
			return;

		<%= funcPrefix %>\Customizer::get_instance();
	}
}
<%= funcPrefix %>_customizer();