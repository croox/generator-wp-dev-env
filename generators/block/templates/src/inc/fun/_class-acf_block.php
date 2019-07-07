<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


// https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/
// https://www.advancedcustomfields.com/resources/acf_register_block/

class <%= block.class_name %> {

	protected static $instance = null;

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
		add_action( 'acf/init', array( $this, 'register_block' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets_editor' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets_frontend' ) );
	}

	public function register_block() {
		if ( function_exists( 'acf_register_block' ) ) {
			acf_register_block( array(
				'name'				=> '<%= block.name %>',
				'title'				=> __( '<%= block.displayName %>', 'wde_replace_textDomain' ),
				'description'		=> __('A custom <%= block.name %> block.', 'wde_replace_textDomain' ),
				'render_callback'	=> array( $this, 'render' ),
				'category'			=> 'common',
				'icon'				=> 'universal-access-alt',
				'keywords'			=> array( '<%= block.name %>' ),
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
		// 	<%= project_class %>::get_instance()->dir_url . '/js/' . $handle . '.min.js',
		// 	array(
		// 		// 'wp-blocks',
		// 		// 'wp-i18n',
		// 		// 'wp-element',
		// 	),
		// 	filemtime( <%= project_class %>::get_instance()->dir_path . 'js/' . $handle . '.min.js' )
		// );
		// wp_localize_script( $handle, '<%= block.handle %>_data', $this->get_localize_data() );
		// wp_set_script_translations( $handle, 'wde_replace_textDomain', <%= project_class %>::get_instance()->dir_path . 'languages' );
		// wp_enqueue_script( $handle );

		// wp_enqueue_style(
		// 	$handle,
		// 	<%= project_class %>::get_instance()->dir_url . '/css/' . $handle . '.min.css',
		// 	array(),
		// 	filemtime( <%= project_class %>::get_instance()->dir_path . 'css/' . $handle . '.min.css' )
		// );

	}

	// hooked on enqueue_block_editor_assets. So function will only run in admin
	public function enqueue_assets_editor() {
		$handle = $this->get_handle( 'editor' );

		// wp_register_script(
		// 	$handle,
		// 	Mate_Maha_Test::plugin_dir_url() . '/js/' . $handle . '.min.js',
		// 	array(
		// 		'wp-blocks',
		// 		'wp-i18n',
		// 		'wp-element',
		// 		'wp-edit-post',
		// 	),
		// 	filemtime( Mate_Maha_Test::plugin_dir_path() . 'js/' . $handle . '.min.js' )
		// );
		// wp_localize_script( $handle, '<%= block.handle %>_data', $this->get_localize_data() );
		// wp_set_script_translations( $handle, 'wde_replace_textDomain', <%= project_class %>::get_instance()->dir_path . 'languages' );
		// wp_enqueue_script( $handle );

		// wp_enqueue_style(
		// 	$handle,
		// 	Mate_Maha_Test::plugin_dir_url() . '/css/' . $handle . '.min.css',
		// 	array(
		// 		'wp-edit-blocks',
		// 	),
		// 	filemtime( Mate_Maha_Test::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		// );
	}

	public function render( $block ) {

		// convert name ("acf/<%= block.name %>") into path friendly slug ("<%= block.name %>")
		$slug = str_replace( 'acf/', '', $block['name'] );

		// include a template part from within the "template_parts/block" folder
		$templateFile = Mate_Maha_Test::plugin_dir_path() . 'template_parts/block/content-' . $slug . '.php';
		if( file_exists( $templateFile ) ) {
			include( $templateFile );
		}

	}

}

function <%= block.handle %>() {
	return <%= block.class_name %>::get_instance();
}
<%= block.handle %>();

?>