<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function <%= funcPrefix %>enqueue_style_<%= assets.name %>(){
		$handle = '<%= funcPrefix %>_style_<%= assets.name %>';

		$deps = array();

		wp_enqueue_style(
			$handle,
			<%= project_class %>::get_instance()->get_dir_url() . '/css/' . $handle . '.min.css',
			$deps,
			false,
			'all'
		);
}
<% if( assets.enqueueFrontend ) { %>add_action( 'wp_enqueue_scripts', '<%= funcPrefix %>enqueue_style_<%= assets.name %>', 10 ); <% } %>
<% if( assets.enqueueAdmin ) { %>add_action( 'admin_enqueue_scripts', '<%= funcPrefix %>enqueue_style_<%= assets.name %>', 10 ); <% } %>
