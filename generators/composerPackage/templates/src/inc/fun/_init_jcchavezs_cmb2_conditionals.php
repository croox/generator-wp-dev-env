<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! class_exists( 'CMB2_Conditionals' ) ) {
	if ( file_exists( <%= project_class %>::get_instance()->get_dir_path() . 'vendor/jcchavezs/cmb2-conditionals/cmb2-conditionals.php' ) ) {
		require_once <%= project_class %>::get_instance()->get_dir_path() . 'vendor/jcchavezs/cmb2-conditionals/cmb2-conditionals.php';
	};
}

function <%= funcPrefix %>_cmb2_conditionals_enqueue_script_src( $src ){
	return <%= project_class %>::get_instance()->get_dir_url() . '/vendor/jcchavezs/cmb2-conditionals/cmb2-conditionals.js';
}
add_filter( 'cmb2_conditionals_enqueue_script_src', '<%= funcPrefix %>_cmb2_conditionals_enqueue_script_src' );

/**
 * May be init composer package jcchavezs/cmb2-conditionals
 *
 */
function <%= funcPrefix %>_init_jcchavezs_cmb2_conditionals() {
	static $cmb2_conditionals = null;
	if ( null === $cmb2_conditionals ) {
		$cmb2_conditionals = new CMB2_Conditionals();
	}

	return $cmb2_conditionals;
}
add_action( 'after_setup_theme', '<%= funcPrefix %>_init_jcchavezs_cmb2_conditionals' );
