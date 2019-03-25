<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Add an extra menu to our nav for our priority+ navigation to use
 *
 * @param object $nav_menu  Nav menu.
 * @param object $args      Nav menu args.
 * @return string More link for hidden menu items.
 */
function <%= funcPrefix %>_add_ellipses_to_nav( $nav_menu, $args ) {

	if ( 'menu-1' === $args->theme_location ) :

		$nav_menu .= '<div class="main-menu-more">';
		$nav_menu .= '<ul class="main-menu">';
		$nav_menu .= '<li class="menu-item menu-item-has-children">';
		$nav_menu .= '<button class="submenu-expand main-menu-more-toggle is-empty" tabindex="-1" aria-label="More" aria-haspopup="true" aria-expanded="false">';
		$nav_menu .= '<span class="screen-reader-text">' . esc_html__( 'More', '<%= textDomain %>' ) . '</span>';
		$nav_menu .= <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'arrow_drop_down_ellipsis' );
		$nav_menu .= '</button>';
		$nav_menu .= '<ul class="sub-menu hidden-links">';
		$nav_menu .= '<li id="menu-item--1" class="mobile-parent-nav-menu-item menu-item--1">';
		$nav_menu .= '<button class="menu-item-link-return">';
		$nav_menu .= <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'chevron_left' );
		$nav_menu .= esc_html__( 'Back', '<%= textDomain %>' );
		$nav_menu .= '</button>';
		$nav_menu .= '</li>';
		$nav_menu .= '</ul>';
		$nav_menu .= '</li>';
		$nav_menu .= '</ul>';
		$nav_menu .= '</div>';

	endif;

	return $nav_menu;
}
add_filter( 'wp_nav_menu', '<%= funcPrefix %>_add_ellipses_to_nav', 10, 2 );