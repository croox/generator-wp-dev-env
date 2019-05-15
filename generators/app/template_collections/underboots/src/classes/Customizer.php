<?php

namespace unte;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// https://codex.wordpress.org/Theme_Customization_API

class Customizer {

	protected static $instance = null;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	protected function __construct() {
		// register settings
		add_action( 'customize_register', array( $this, 'register' ) );
		add_action( 'customize_register', array( $this, 'register_theme' ) );
		// Scripts for Preview
		add_action( 'customize_preview_init', array( $this, 'preview_js' ) );
	}

	/**
	 * Add postMessage support for site title and description for the Theme Customizer.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
		$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
	}

	/**
	 * Select sanitization function
	 *
	 * @param string               $input   Slug to sanitize.
	 * @param WP_Customize_Setting $setting Setting instance.
	 * @return string Sanitized slug if it is a valid choice; otherwise, the setting default.
	 */
	public function theme_slug_sanitize_select( $input, $setting ) {
		// Ensure input is a slug (lowercase alphanumeric characters, dashes and underscores are allowed only).
		$input = sanitize_key( $input );

		// Get the list of possible select options.
		$choices = $setting->manager->get_control( $setting->id )->choices;

		// If the input is a valid key, return it; otherwise, return the default.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
	}

	/**
	 * Register individual settings through customizer's API.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	public function register_theme( $wp_customize ) {

		// Theme layout settings.
		$wp_customize->add_section(
			'unte_theme_layout_options',
			array(
				'title'       => __( 'Theme Layout Settings', 'unte' ),
				'capability'  => 'edit_theme_options',
				'description' => __( 'Container width and sidebar defaults', 'unte' ),
				'priority'    => 160,
			)
		);

		$wp_customize->add_setting(
			'unte_container_type',
			array(
				'default'           => 'container',
				'type'              => 'theme_mod',
				'sanitize_callback' => array( $this, 'theme_slug_sanitize_select' ),
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new \WP_Customize_Control(
				$wp_customize,
				'unte_container_type',
				array(
					'label'       => __( 'Container Width', 'unte' ),
					'description' => __( 'Choose between Bootstrap\'s container and container-fluid', 'unte' ),
					'section'     => 'unte_theme_layout_options',
					'settings'    => 'unte_container_type',
					'type'        => 'select',
					'choices'     => array(
						'container'       => __( 'Fixed width container', 'unte' ),
						'container-fluid' => __( 'Full width container', 'unte' ),
					),
					'priority'    => '10',
				)
			)
		);

		$wp_customize->add_setting(
			'unte_sidebar_position',
			array(
				'default'           => 'right',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new \WP_Customize_Control(
				$wp_customize,
				'unte_sidebar_position',
				array(
					'label'             => __( 'Sidebar Positioning', 'unte' ),
					'description'       => __(
						'Set sidebar\'s default position. Can either be: right, left, both or none. Note: this can be overridden on individual pages.',
						'unte'
					),
					'section'           => 'unte_theme_layout_options',
					'settings'          => 'unte_sidebar_position',
					'type'              => 'select',
					'sanitize_callback' => 'unte_theme_slug_sanitize_select',
					'choices'           => array(
						'right' => __( 'Right sidebar', 'unte' ),
						'left'  => __( 'Left sidebar', 'unte' ),
						'both'  => __( 'Left & Right sidebars', 'unte' ),
						'none'  => __( 'No sidebar', 'unte' ),
					),
					'priority'          => '20',
				)
			)
		);
	}

	/**
	 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
	 * Setup JS integration for live previewing.
	 */
	public function preview_js() {
		$handle = 'unte_customizer';
		$_src = '/js/' . $handle . '.min.js';
		$src = namespace\Unte::get_instance()->get_dir_url() . $_src;
		$ver = namespace\Unte::get_instance()->get_version() . '.' . filemtime( namespace\Unte::get_instance()->get_dir_path() . $_src );
		wp_enqueue_script(
			$handle,
			$src,
			array( 'customize-preview' ),
			$ver,
			true
		);
	}

}