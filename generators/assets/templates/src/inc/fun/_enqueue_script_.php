<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function <%= funcPrefix %>_enqueue_script_<%= assets.name %>(){
	$handle = '<%= funcPrefix %>_script_<%= assets.name %>';

	$deps = array(
		// 'wp-hooks',
		// 'wp-api',
		// 'wp-data',
		// 'wp-i18n',
		'jquery'
	);

	wp_register_script(
		$handle,
		<%= project_class %>::get_instance()->get_dir_url() . '/js/' . $handle  . '.min.js',
		$deps
	);

	wp_localize_script( $handle, $handle . '_data', array() );
	wp_set_script_translations( $handle, '<%= textDomain %>', <%= project_class %>::get_instance()->get_dir_path() . 'languages' );
	wp_enqueue_script( $handle );
}
<% if( assets.enqueueFrontend ) { %>add_action( 'wp_enqueue_scripts', '<%= funcPrefix %>_enqueue_script_<%= assets.name %>', 10 ); <% } %>
<% if( assets.enqueueAdmin ) { %>add_action( 'admin_enqueue_scripts', '<%= funcPrefix %>_enqueue_script_<%= assets.name %>', 10 ); <% } %>
