<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Display SVG icons in social links menu.
 *
 * @param  string  $item_output The menu item output.
 * @param  WP_Post $item        Menu item object.
 * @param  int     $depth       Depth of the menu.
 * @param  array   $args        wp_nav_menu() arguments.
 * @return string  $item_output The menu item output with social icon.
 */
function <%= funcPrefix %>_nav_menu_social_icons( $item_output, $item, $depth, $args ) {
	// Change SVG icon inside social links menu if there is supported URL.
	if ( 'social' === $args->theme_location ) {
		$svg = <%= funcPrefix %>\SVG_Icons::get_social_icon_svg( $item->url, 26 );
		if ( empty( $svg ) ) {
			$svg = <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'link' );
		}
		$item_output = str_replace( $args->link_after, '</span>' . $svg, $item_output );
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', '<%= funcPrefix %>_nav_menu_social_icons', 10, 4 );
