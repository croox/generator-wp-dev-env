<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function <%= funcPrefix %>_enqueue_script_<%= assets.name %>(){
	$handle = '<%= funcPrefix %>_script_<%= assets.name %>';

	<%= project_class %>::get_instance()->register_script( array(
		'handle'		=> $handle,
		'deps'			=> array(
			// 'wp-hooks',
			// 'wp-api',
			// 'wp-data',
			// 'wp-i18n',
			'jquery',
		),
		'in_footer'		=> true,	// default false
		'enqueue'		=> true,
		// 'localize_data'	=> array(),
	) );

}
<% if( assets.enqueueFrontend ) { %>add_action( 'wp_enqueue_scripts', '<%= funcPrefix %>_enqueue_script_<%= assets.name %>', 10 ); <% } %>
<% if( assets.enqueueAdmin ) { %>add_action( 'admin_enqueue_scripts', '<%= funcPrefix %>_enqueue_script_<%= assets.name %>', 10 ); <% } %>
