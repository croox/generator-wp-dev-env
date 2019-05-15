<?php
/**
 * Declaring widgets
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( '<%= funcPrefix %>_widgets_init' ) ) {
	/**
	 * Initializes themes widgets.
	 */
	function <%= funcPrefix %>_widgets_init() {
		register_sidebar(
			array(
				'name'          => __( 'Right Sidebar', '<%= textDomain %>' ),
				'id'            => 'right-sidebar',
				'description'   => __( 'Right sidebar widget area', '<%= textDomain %>' ),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				'name'          => __( 'Left Sidebar', '<%= textDomain %>' ),
				'id'            => 'left-sidebar',
				'description'   => __( 'Left sidebar widget area', '<%= textDomain %>' ),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				'name'          => __( 'Hero Slider', '<%= textDomain %>' ),
				'id'            => 'hero',
				'description'   => __( 'Hero slider area. Place two or more widgets here and they will slide!', '<%= textDomain %>' ),
				'before_widget' => '<div class="carousel-item">',
				'after_widget'  => '</div>',
				'before_title'  => '',
				'after_title'   => '',
			)
		);

		register_sidebar(
			array(
				'name'          => __( 'Hero Canvas', '<%= textDomain %>' ),
				'id'            => 'herocanvas',
				'description'   => __( 'Full size canvas hero area for Bootstrap and other custom HTML markup', '<%= textDomain %>' ),
				'before_widget' => '',
				'after_widget'  => '',
				'before_title'  => '',
				'after_title'   => '',
			)
		);

		register_sidebar(
			array(
				'name'          => __( 'Top Full', '<%= textDomain %>' ),
				'id'            => 'statichero',
				'description'   => __( 'Full top widget with dynamic grid', '<%= textDomain %>' ),
				'before_widget' => '<div id="%1$s" class="footer-widget %2$s dynamic-classes">',
				'after_widget'  => '</div><!-- .static-hero-widget -->',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

		register_sidebar(
			array(
				'name'          => __( 'Footer Full', '<%= textDomain %>' ),
				'id'            => 'footerfull',
				'description'   => __( 'Full sized footer widget with dynamic grid', '<%= textDomain %>' ),
				'before_widget' => '<div id="%1$s" class="footer-widget %2$s dynamic-classes">',
				'after_widget'  => '</div><!-- .footer-widget -->',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			)
		);

	}
} // endif function_exists( '<%= funcPrefix %>_widgets_init' ).

add_action( 'widgets_init', '<%= funcPrefix %>_widgets_init' );
