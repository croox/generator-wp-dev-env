<?php
/**
 * TEST__mein_block: Customizer
 *
 * @package WordPress
 * @subpackage <%= name %>
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function <%= funcPrefix %>_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => '<%= funcPrefix %>_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => '<%= funcPrefix %>_customize_partial_blogdescription',
			)
		);
	}

	/**
	 * Primary color.
	 */
	$wp_customize->add_setting(
		'primary_color',
		array(
			'default'           => 'default',
			'transport'         => 'postMessage',
			'sanitize_callback' => '<%= funcPrefix %>_sanitize_color_option',
		)
	);

	$wp_customize->add_control(
		'primary_color',
		array(
			'type'     => 'radio',
			'label'    => __( 'Primary Color', '<%= textDomain %>' ),
			'choices'  => array(
				'default'  => _x( 'Default', 'primary color', '<%= textDomain %>' ),
				'custom' => _x( 'Custom', 'primary color', '<%= textDomain %>' ),
			),
			'section'  => 'colors',
			'priority' => 5,
		)
	);

	// Add primary color hue setting and control.
	$wp_customize->add_setting(
		'primary_color_hue',
		array(
			'default'           => 199,
			'transport'         => 'postMessage',
			'sanitize_callback' => 'absint',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'primary_color_hue',
			array(
				'description' => __( 'Apply a custom color for buttons, links, featured images, etc.', '<%= textDomain %>' ),
				'section'     => 'colors',
				'mode'        => 'hue',
			)
		)
	);

	// Add image filter setting and control.
	$wp_customize->add_setting(
		'image_filter',
		array(
			'default'           => 1,
			'sanitize_callback' => 'absint',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		'image_filter',
		array(
			'label'   => __( 'Apply a filter to featured images using the primary color', '<%= textDomain %>' ),
			'section' => 'colors',
			'type'    => 'checkbox',
		)
	);
}
add_action( 'customize_register', '<%= funcPrefix %>_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function <%= funcPrefix %>_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function <%= funcPrefix %>_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Bind JS handlers to instantly live-preview changes.
 */
function <%= funcPrefix %>_customize_preview_js() {
	wp_enqueue_script( '<%= funcPrefix %>-customize-preview', <%= project_class %>::get_instance()->get_dir_url() . '/js/customize_preview.min.js', array( 'customize-preview' ), false, true );
}
add_action( 'customize_preview_init', '<%= funcPrefix %>_customize_preview_js' );

/**
 * Load dynamic logic for the customizer controls area.
 */
function <%= funcPrefix %>_panels_js() {
	wp_enqueue_script( '<%= funcPrefix %>-customize-controls', <%= project_class %>::get_instance()->get_dir_url() . '/js/customize_controls.min.js', array(), false, true );
}
add_action( 'customize_controls_enqueue_scripts', '<%= funcPrefix %>_panels_js' );

/**
 * Sanitize custom color choice.
 *
 * @param string $choice Whether image filter is active.
 *
 * @return string
 */
function <%= funcPrefix %>_sanitize_color_option( $choice ) {
	$valid = array(
		'default',
		'custom',
	);

	if ( in_array( $choice, $valid, true ) ) {
		return $choice;
	}

	return 'default';
}
