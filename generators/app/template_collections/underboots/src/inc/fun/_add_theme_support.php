<?php
/**
 * Theme basic setup.
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}


if ( ! function_exists ( 'unte_add_theme_support' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function unte_add_theme_support() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => __( 'Primary Menu', 'unte' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/*
		 * Adding Thumbnail basic support
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Adding support for Widget edit icons in customizer
		 */
		add_theme_support( 'customize-selective-refresh-widgets' );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'unte_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Set up the WordPress Theme logo feature.
		add_theme_support( 'custom-logo' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Check and setup theme default settings.
		unte_setup_theme_default_settings();

		/**
		 * Filter unterhose custom-header support arguments.
		 *
		 * @since unterhose 0.5.2
		 *
		 * @param array $args {
		 *     An array of custom-header support arguments.
		 *
		 *     @type string $default-image          Default image of the header.
		 *     @type string $default_text_color     Default color of the header text.
		 *     @type int    $width                  Width in pixels of the custom header image. Default 954.
		 *     @type int    $height                 Height in pixels of the custom header image. Default 1300.
		 *     @type string $wp-head-callback       Callback function used to styles the header image and text
		 *                                          displayed on the blog.
		 *     @type string $flex-height            Flex support for height of header.
		 * }
		 */
		add_theme_support(
			'custom-header',
			apply_filters(
				'unte_custom_header_args',
				array(
					'default-image' => unte\Unte::get_instance()->get_dir_url() . '/images/header.jpg',
					'width'         => 2000,
					'height'        => 300,
					'flex-height'   => true,
				)
			)
		);

		// ??? hej understrap, funktioniert das
		register_default_headers(
			array(
				'default-image' => array(
					'url'           => '%s/images/header.jpg',
					'thumbnail_url' => '%s/images/header.jpg',
					'description'   => __( 'Default Header Image', 'unte' ),
				),
			)
		);

		// // ??? may be
		// // ??? may be
		// // ??? may be
		// // Adding support for core block visual styles.
		// add_theme_support( 'wp-block-styles' );

		// // Add support for full and wide align images.
		// add_theme_support( 'align-wide' );

		// // https://wordpress.org/gutenberg/handbook/extensibility/theme-support/#editor-styles
		// add_theme_support( 'editor-styles' );

		// // // theme support dark-editor-style would add a class 'is-dark-theme' to admin body, but not all our theme is dark.
		// // // So the filter function 'bier_admin_editor_classes' will add the class conditionaly
		// // // add_theme_support( 'dark-editor-style' );

	}
}

add_action( 'after_setup_theme', 'unte_add_theme_support' );
