<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class <%= block.class_name %> {

	protected static $instance = null;

	protected $namspace = '<%= funcPrefix %>/<%= block.name %>';

	protected $handles = array(
		'editor' => '<%= block.handle %>_editor',
		'frontend' => '<%= block.handle %>_frontend',
	);

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->hooks();
		}

		return self::$instance;
	}

	protected function __construct() {
		// ... silence
	}

	public function hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_assets_editor' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_assets_frontend' ) );
	}

	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type( $this->namspace, array(
				'editor_script' => $this->get_handle( 'editor' ),
				'editor_style' => $this->get_handle( 'editor' ),
				'style' => $this->get_handle( 'frontend' ),
				// 'script' => $this->get_handle( 'frontend' ),
				// 'render_callback' => array( $this, 'render' ),	// if server side rendered (js block save method returns null)
			) );
		}
	}

	protected function get_handle( $key ){
		$handles = $this->handles;
		if ( array_key_exists( $key, $handles ) ) {
			return $handles[$key];
		}
	}

	protected function get_localize_data(){
		return array();
	}

	// hooked on enqueue_block_assets. So function will run in admin and frontend.
	// But we will use it only on frontend
	public function enqueue_assets_frontend() {

		/**
		 * Use this filter to cancel enqueueing frontend assets
		 *
		 * @param boolean		$should_cancel_enqueue	default true
		 * @return boolean
		 */
		if ( is_admin() || ! apply_filters( '<%= block.handle %>_enqueue_assets_frontend', true )  )
			return;

		$handle = $this->get_handle( 'frontend' );

		// wp_register_script(
		// 	$handle,
		// 	<%= project_class %>::<%= projectType %>_dir_url() . '/js/' . $handle . '.min.js',
		// 	array(
		// 		// 'wp-blocks',
		// 		// 'wp-i18n',
		// 		// 'wp-element',
		// 	),
		// 	filemtime( <%= project_class %>::<%= projectType %>_dir_path() . 'js/' . $handle . '.min.js' )
		// );
		// wp_localize_script( $handle, '<%= block.handle %>_data', $this->get_localize_data() );
		// wp_set_script_translations( $handle, 'wde_replace_textDomain', <%= project_class %>::<%= projectType %>_dir_path() . 'languages' );
		// wp_enqueue_script( $handle );

		wp_enqueue_style(
			$handle,
			<%= project_class %>::<%= projectType %>_dir_url() . '/css/' . $handle . '.min.css',
			array(),
			filemtime( <%= project_class %>::<%= projectType %>_dir_path() . 'css/' . $handle . '.min.css' )
		);

	}

	// hooked on enqueue_block_editor_assets. So function will only run in admin
	public function enqueue_assets_editor() {
		$handle = $this->get_handle( 'editor' );

		wp_register_script(
			$handle,
			<%= project_class %>::<%= projectType %>_dir_url() . '/js/' . $handle . '.min.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-edit-post',
			),
			filemtime( <%= project_class %>::<%= projectType %>_dir_path() . 'js/' . $handle . '.min.js' )
		);
		wp_localize_script( $handle, '<%= block.handle %>_data', $this->get_localize_data() );
		wp_set_script_translations( $handle, 'wde_replace_textDomain', <%= project_class %>::<%= projectType %>_dir_path() . 'languages' );
		wp_enqueue_script( $handle );

		wp_enqueue_style(
			$handle,
			<%= project_class %>::<%= projectType %>_dir_url() . '/css/' . $handle . '.min.css',
			array(
				'wp-edit-blocks',
			),
			filemtime( <%= project_class %>::<%= projectType %>_dir_path() . 'css/' . $handle . '.min.css' )
		);
	}

	// public function render( $attributes, $content ) {
	// 	return '<div>some example html markup</div>';
	// }

}

function <%= block.handle %>() {
	return <%= block.class_name %>::get_instance();
}
<%= block.handle %>();

?>