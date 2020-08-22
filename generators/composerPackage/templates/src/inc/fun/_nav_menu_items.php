<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Example:
 * Dynamically add all '<%= funcPrefix %>_example_custom_post_type' posts
 * as submenu items to the post_type_archive menu-item.
 */
function <%= funcPrefix %>_nav_menu_items() {

	$post_type = '<%= funcPrefix %>_example_custom_post_type';

	if ( is_admin() )
		return;

	$menu_object = wp_get_nav_menu_object( get_nav_menu_locations()['primary'] );

	if ( ! $menu_object instanceof WP_Term )
		return;

	$current_menu_items = wp_get_nav_menu_items( $menu_object->name, array() );

	if ( ! $current_menu_items )
		return;

	foreach( $current_menu_items as $menu_item ) {

		if ( 'post_type_archive' !== $menu_item->type || $post_type !== $menu_item->object )
			continue;

		$posts = get_posts( array(
			'post_type' => $post_type,
			'posts_per_page' => -1,
			'order' => 'asc',
			'orderby' => 'title',
		) );

		// add new sub menu items for each taxonomy term.
		// see https://github.com/daggerhart/wp-custom-menu-items
		foreach( $posts as $index => $post ) {
			custom_menu_items::add_object(
				$menu_object->slug, 	// menu_slug
				$post->ID, 				// object_ID
				'post', 				// object_type
				$index, 				// order
				$menu_item->ID			// parent
				// null					// ID
			);
		}
	}
}

// add_action( 'wp', '<%= funcPrefix %>_nav_menu_items' );
