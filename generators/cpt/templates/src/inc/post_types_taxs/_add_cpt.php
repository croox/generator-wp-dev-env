<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Register a <%= funcPrefix %>_<%= cpt.singularName %> post type.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
function <%= funcPrefix %>_add_cpt_<%= cpt.singularName %>() {

	$post_type = '<%= funcPrefix %>_<%= cpt.singularName %>';
	$labels = array(
		'name'                  => _x( '<%= cpt.displayName %>s', 'Post Type General Name', '<%= textDomain %>' ),
		'singularName'          => _x( '<%= cpt.displayName %>', 'Post Type Singular Name', '<%= textDomain %>' ),
		'menu_name'             => __( '<%= cpt.displayName %>s', '<%= textDomain %>' ),
		'name_admin_bar'        => __( '<%= cpt.displayName %>', '<%= textDomain %>' ),
		'archives'              => __( '<%= cpt.displayName %>s', '<%= textDomain %>' ),
		'attributes'            => __( '<%= cpt.displayName %> Attributes', '<%= textDomain %>' ),
		'parent_item_colon'     => __( 'Parent <%= cpt.displayName %>:', '<%= textDomain %>' ),
		'all_items'             => __( 'All <%= cpt.displayName %>s', '<%= textDomain %>' ),
		'add_new_item'          => __( 'Add New <%= cpt.displayName %>', '<%= textDomain %>' ),
		'add_new'               => __( 'Add New', '<%= textDomain %>' ),
		'new_item'              => __( 'New <%= cpt.displayName %>', '<%= textDomain %>' ),
		'edit_item'             => __( 'Edit <%= cpt.displayName %>', '<%= textDomain %>' ),
		'update_item'           => __( 'Update <%= cpt.displayName %>', '<%= textDomain %>' ),
		'view_item'             => __( 'View <%= cpt.displayName %>', '<%= textDomain %>' ),
		'view_items'            => __( 'View <%= cpt.displayName %>s', '<%= textDomain %>' ),
		'search_items'          => __( 'Search <%= cpt.displayName %>', '<%= textDomain %>' ),
		'not_found'             => __( 'Not found', '<%= textDomain %>' ),
		'not_found_in_trash'    => __( 'Not found in Trash', '<%= textDomain %>' ),
		'featured_image'        => __( 'Featured Image', '<%= textDomain %>' ),
		'set_featured_image'    => __( 'Set featured image', '<%= textDomain %>' ),
		'remove_featured_image' => __( 'Remove featured image', '<%= textDomain %>' ),
		'use_featured_image'    => __( 'Use as featured image', '<%= textDomain %>' ),
		'insert_into_item'      => __( 'Insert into <%= cpt.displayName %>', '<%= textDomain %>' ),
		'uploaded_to_this_item' => __( 'Uploaded to this <%= cpt.displayName %>', '<%= textDomain %>' ),
		'items_list'            => __( '<%= cpt.displayName %>s list', '<%= textDomain %>' ),
		'items_list_navigation' => __( '<%= cpt.displayName %>s list navigation', '<%= textDomain %>' ),
		'filter_items_list'     => __( 'Filter <%= cpt.displayName %>s list', '<%= textDomain %>' ),
	);

	$args = array(
		'label'                 => __( '<%= cpt.displayName %>', '<%= textDomain %>' ),
		'description'           => __( '<%= cpt.displayName %> description', '<%= textDomain %>' ),
		'labels'                => $labels,
		'supports'              => <%- 'array(\n			\'' + cpt.supports.join('\',\n			\'') + '\',\n		)' %>,
		'hierarchical'          => <%= cpt.hierarchical %>,
		'public'                => <%= cpt.public %>,
		'show_ui'               => <%= cpt.public %>,
		'show_in_menu'          => <%= cpt.public %>,
		'menu_position'         => 5,
		'show_in_admin_bar'     => <%= cpt.public %>,
		'show_in_nav_menus'     => <%= cpt.public %>,
		'can_export'            => <%= cpt.canExport %>,
		'has_archive'           => <%= cpt.hasArchive %>,
		'exclude_from_search'   => <%= ! cpt.public %>,
		'publicly_queryable'    => <%= cpt.public %>,
		'menu_icon'             => null,	// https://developer.wordpress.org/resource/dashicons/#admin-page
		'show_in_rest'          => <%= cpt.showInRest %>,
		'capability_type'       => '<%= cpt.capabilityType %>',
		<% if ( cpt.showInRest ) { %>'rest_base'          	=> $post_type . 's', <% } %>
	);
	register_post_type( $post_type, $args );

}
add_action( 'init', '<%= funcPrefix %>_add_cpt_<%= cpt.singularName %>' );
add_action( '<%= funcPrefix %>_on_activate_before_flush', '<%= funcPrefix %>_add_cpt_<%= cpt.singularName %>' );

