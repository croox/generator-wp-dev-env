<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function <%= funcPrefix %>_enqueue_style_<%= assets.name %>(){
	$handle = '<%= funcPrefix %>_style_<%= assets.name %>';

	<%= project_class %>::get_instance()->register_style( array(
		'handle'	=> $handle,
		'deps'		=> array(),
		// 'media'		=> 'all',
		'enqueue'	=> true,
	);

}
<% if( assets.enqueueFrontend ) { %>add_action( 'wp_enqueue_scripts', '<%= funcPrefix %>_enqueue_style_<%= assets.name %>', 10 ); <% } %>
<% if( assets.enqueueAdmin ) { %>add_action( 'admin_enqueue_scripts', '<%= funcPrefix %>_enqueue_style_<%= assets.name %>', 10 ); <% } %>
