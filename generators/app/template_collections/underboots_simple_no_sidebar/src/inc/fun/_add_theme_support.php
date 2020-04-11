<?php
/**
 * Theme basic setup.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}


if ( ! function_exists ( '<%= funcPrefix %>_add_theme_support' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function <%= funcPrefix %>_add_theme_support() {

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
			'primary' => __( 'Primary Menu', '<%= textDomain %>' ),
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

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '<%= funcPrefix %>_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Set up the WordPress Theme logo feature.
		add_theme_support( 'custom-logo' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Customize Block Color Palettes
		// hard coded copy of scss variables
		// See
		//	- Bootstrap variables												src/scss/<%= funcPrefix %>_frontend/variables_site/_variables_bootstrap.scss
		//	- Add background and text color classes for theme-color-palette 	src/scss/<%= funcPrefix %>_frontend/_generic.scss
		//	- Add background gradients classes for editor_gradient_presets		src/scss/<%= funcPrefix %>_frontend/_generic.scss
		// https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes
		$editor_color_palette_assoc = array(
			// bootstrap colors
			'primary'	=> array(
				'name' => __( 'Primary', '<%= textDomain %>' ),
				'slug' => 'primary',
				'color' => '#007bff',
			),
			'secondary'	=> array(
				'name' => __( 'Secondary', '<%= textDomain %>' ),
				'slug' => 'secondary',
				'color' => '#6c757d',
			),

			'blue'	=> array(
				'name' => __( 'Blue', '<%= textDomain %>' ),
				'slug' => 'blue',
				'color' => '#007bff',
			),
			'indigo'	=> array(
				'name' => __( 'Indigo', '<%= textDomain %>' ),
				'slug' => 'indigo',
				'color' => '#6610f2',
			),
			'purple'	=> array(
				'name' => __( 'Purple', '<%= textDomain %>' ),
				'slug' => 'purple',
				'color' => '#6f42c1',
			),
			'pink'	=> array(
				'name' => __( 'Pink', '<%= textDomain %>' ),
				'slug' => 'pink',
				'color' => '#e83e8c',
			),
			'red'	=> array(
				'name' => __( 'Red', '<%= textDomain %>' ),
				'slug' => 'red',
				'color' => '#dc3545',
			),
			'orange'	=> array(
				'name' => __( 'Orange', '<%= textDomain %>' ),
				'slug' => 'orange',
				'color' => '#fd7e14',
			),
			'yellow'	=> array(
				'name' => __( 'Yellow', '<%= textDomain %>' ),
				'slug' => 'yellow',
				'color' => '#ffc107',
			),
			'green'	=> array(
				'name' => __( 'Green', '<%= textDomain %>' ),
				'slug' => 'green',
				'color' => '#28a745',
			),
			'teal'	=> array(
				'name' => __( 'Teal', '<%= textDomain %>' ),
				'slug' => 'teal',
				'color' => '#20c997',
			),
			'cyan'	=> array(
				'name' => __( 'Cyan', '<%= textDomain %>' ),
				'slug' => 'cyan',
				'color' => '#17a2b8',
			),
			// bootstrap grays
			'white'	=> array(
				'name' => __( 'White', '<%= textDomain %>' ),
				'slug' => 'white',
				'color' => '#ffffff',
			),
			'gray-100'	=> array(
				'name' => __( 'Gray 100', '<%= textDomain %>' ),
				'slug' => 'gray-100',
				'color' => '#f8f9fa',
			),
			'gray-200'	=> array(
				'name' => __( 'Gray 200', '<%= textDomain %>' ),
				'slug' => 'gray-200',
				'color' => '#e9ecef',
			),
			'gray-300'	=> array(
				'name' => __( 'Gray 300', '<%= textDomain %>' ),
				'slug' => 'gray-300',
				'color' => '#dee2e6',
			),
			'gray-400'	=> array(
				'name' => __( 'Gray 400', '<%= textDomain %>' ),
				'slug' => 'gray-400',
				'color' => '#ced4da',
			),
			'gray-500'	=> array(
				'name' => __( 'Gray 500', '<%= textDomain %>' ),
				'slug' => 'gray-500',
				'color' => '#adb5bd',
			),
			'gray-600'	=> array(
				'name' => __( 'Gray 600', '<%= textDomain %>' ),
				'slug' => 'gray-600',
				'color' => '#6c757d',
			),
			'gray-700'	=> array(
				'name' => __( 'Gray 700', '<%= textDomain %>' ),
				'slug' => 'gray-700',
				'color' => '#495057',
			),
			'gray-800'	=> array(
				'name' => __( 'Gray 800', '<%= textDomain %>' ),
				'slug' => 'gray-800',
				'color' => '#343a40',
			),
			'gray-900'	=> array(
				'name' => __( 'Gray 900', '<%= textDomain %>' ),
				'slug' => 'gray-900',
				'color' => '#212529',
			),
			'black'	=> array(
				'name' => __( 'Black', '<%= textDomain %>' ),
				'slug' => 'black',
				'color' => '#000000',
			),
		);
		add_theme_support( 'editor-color-palette', array_values( $editor_color_palette_assoc ) );

		/**
		 * Example: Configure the predefined set of gradients.
		 * And add inline style, generic css classes.
		 */
		/*
		if ( method_exists( 'croox\wde\utils\Color', 'build_editor_gradient_presets' )
			&& method_exists( 'croox\wde\utils\Color', 'build_gradient_presets_css' )
		) {
			$editor_gradient_presets = utils\Color::build_editor_gradient_presets( array(
				array(
					'type' => 'linear',
					'deg' => '90',
					'steps' => array(
						// 		slug 			alpha 	step
						array( 'primary', 		1,		0 ),
						array( 'secondary', 	1, 		100 ),
					),
				),
				array(
					'type' => 'radial',
					'steps' => array(
						// 		slug 			alpha 	step
						array( 'white',			1, 		0 ),
						array( 'black', 		1, 		100 ),
					),
				),
			), $editor_color_palette_assoc );

			add_theme_support(
				'editor-gradient-presets',
				$editor_gradient_presets
			);

			// Add inline style, generic css classes, for $editor_gradient_presets
			$gradient_presets_css = utils\Color::build_gradient_presets_css( $editor_gradient_presets );
			add_action( 'wp_enqueue_scripts', function() use ( $gradient_presets_css ) {
				wp_add_inline_style( '<%= funcPrefix %>_frontend', $gradient_presets_css );
			}, 20 );
			add_action( 'admin_enqueue_scripts', function() use ( $gradient_presets_css ) {
				wp_add_inline_style( '<%= funcPrefix %>_editor', $gradient_presets_css );
			}, 20 );
		}
		*/

		// Add Support For Block Editor Alignments
		// https://developer.wordpress.org/block-editor/developers/themes/theme-support/#wide-alignment
		add_theme_support( 'align-wide' );
		add_theme_support( 'align-full' );

		// Check and setup theme default settings.
		<%= funcPrefix %>_setup_theme_default_settings();

		/**
		 * Filter <%= name %> custom-header support arguments.
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
				'<%= funcPrefix %>_custom_header_args',
				array(
					'default-image' => <%= project_class %>::get_instance()->dir_url . '/images/header.jpg',
					'width'         => 2000,
					'height'        => 300,
					'flex-height'   => true,
					'header-text'	=> false,
				)
			)
		);

		register_default_headers(
			array(
				'default-image' => array(
					'url'           => '%s/images/header.jpg',
					'thumbnail_url' => '%s/images/header.jpg',
					'description'   => __( 'Default Header Image', '<%= textDomain %>' ),
				),
			)
		);

	}
}

add_action( 'after_setup_theme', '<%= funcPrefix %>_add_theme_support' );
