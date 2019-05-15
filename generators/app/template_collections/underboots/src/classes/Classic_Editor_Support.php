<?php

namespace <%= funcPrefix %>;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Classic_Editor_Support {

	protected static $instance = null;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	protected function __construct() {
		add_action( 'current_screen',  array( $this, 'hooks' ), 9 );	// priority earlier then 10!
	}

	public function hooks( $current_screen ) {

		// get out if block editor
		// ... well we already checked before initialization, but lets do it again.
		if ( $current_screen->is_block_editor )
			return;

		add_action( 'current_screen', array( $this, 'tiny_mce_stylesheet' ) );
		add_filter( 'mce_buttons_2', array( $this, 'tiny_mce_style_formats' ) );
		add_filter( 'tiny_mce_before_init', array( $this, 'tiny_mce_before_init' ) );

	}

	public function tiny_mce_stylesheet( $current_screen ) {
		add_editor_style( namespace\<%= startCase( kebabCase( funcPrefix ) ) %>::get_instance()->dir_url . '/css/<%= funcPrefix %>_classic_editor_tiny_mce.min.css' );
	}

	// Add TinyMCE style formats.
	public function tiny_mce_style_formats( $styles ) {
		array_unshift( $styles, 'styleselect' );
		return $styles;
	}

	public function tiny_mce_before_init( $settings ) {

		$style_formats = array(
			array(
				'title'    => 'Lead Paragraph',
				'selector' => 'p',
				'classes'  => 'lead',
				'wrapper'  => true,
			),
			array(
				'title'  => 'Small',
				'inline' => 'small',
			),
			array(
				'title'   => 'Blockquote',
				'block'   => 'blockquote',
				'classes' => 'blockquote',
				'wrapper' => true,
			),
			array(
				'title'   => 'Blockquote Footer',
				'block'   => 'footer',
				'classes' => 'blockquote-footer',
				'wrapper' => true,
			),
			array(
				'title'  => 'Cite',
				'inline' => 'cite',
			),
		);

		if ( isset( $settings['style_formats'] ) ) {
			$orig_style_formats = json_decode( $settings['style_formats'], true );
			$style_formats      = array_merge( $orig_style_formats, $style_formats );
		}

		$settings['style_formats'] = json_encode( $style_formats );
		return $settings;
	}

}