<?php
/**
 * <%= startCase( displayName + ' ' + projectTypeExplicit ) %> init
 *
 * @package <%= name %>
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class <%= project_class %> {

	protected static $instance = null;
	const VERSION = 'wde_replace_version';
	const DB_VERSION = 0;			// int	increase the number if the database needs an update
	const THEME_SLUG = 'wde_replace_name';
	const THEME_NAME = 'wde_replace_displayName';<% if ( typeof template !== 'undefined' ) { %>
	const THEME_PARENT = '<%= template %>';<% }%>
	const THEME_PREFIX = 'wde_replace_funcPrefix';
	protected $deactivate_notice = '';
	protected $deps = array(
		'plugins' => array(
			/*
			'woocommerce' => array(
				'name'				=> 'WooCommerce',				// full name
				'link'				=> 'https://woocommerce.com/',	// link
				'ver_at_least'		=> '3.0.0',						// min version of required plugin
				'ver_tested_up_to'	=> '3.2.1',						// tested with required plugin up to
				'class'				=> 'WooCommerce',				// test by class
				//'function'		=> 'WooCommerce',				// test by function
			),
			*/
		),
		'php_version' => 'wde_replace_phpRequiresAtLeast',			// required php version
		'wp_version' => 'wde_replace_wpRequiresAtLeast',			// required wp version
		'php_ext' => array(
			/*
			'xml' => array(
				'name'				=> 'Xml',											// full name
				'link'				=> 'http://php.net/manual/en/xml.installation.php',	// link
			),
			*/
		),
	);
	protected $dependencies_ok = false;
	protected $style_deps = array();

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->initialize();
		}
		return self::$instance;
	}

	public function initialize() {

		// activate
		$this->activate();

		// start
		$this->start();

		// on deactivate
		add_action( 'switch_theme', array( $this, 'on_deactivate' ), 10, 3 );

		// // set content_width
		// add_action( 'after_setup_theme', array( $this, 'content_width' ), 0 );
	}

	public static function theme_dir_url(){
		return get_theme_root_uri() . '/' . self::theme_dir_basename();	// no trailing slash
	}

	public static function theme_dir_path(){
		return trailingslashit( dirname( __FILE__ ) );					// trailing slash
	}

	public static function theme_dir_basename(){
		return basename( dirname( __FILE__ ) );							// no trailing slash
	}

	public static function theme_file(){
		return __FILE__;												// theme file abs path
	}

	public function activate() {

		$option_key = self::THEME_SLUG . '_activated';

		if ( ! $this->check_dependencies() )
			$this->deactivate();

		if ( ! get_option( $option_key ) ) {

			$this->init_options();
			$this->register_post_types_and_taxs();
			$this->add_roles_and_capabilities();

			// hook the register post type functions, because init is to late
			do_action( '<%= funcPrefix %>_on_activate_before_flush' );
			flush_rewrite_rules();
			$this->maybe_update();

			update_option( $option_key , 1 );
			do_action( '<%= funcPrefix %>_theme_activated' );

		}

	}

	public function start() {
		if ( ! $this->check_dependencies() )
			$this->deactivate();

		$this->auto_include();

		add_action( 'after_setup_theme', array( $this, 'load_textdomain' ) );
		$this->register_post_types_and_taxs();
		$this->add_roles_and_capabilities();
		$this->maybe_update();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_parent_styles' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 100 );	// ??? if enfold 100
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
		do_action( '<%= funcPrefix %>_theme_loaded' );
	}

	// /**
	//  * Set the content width in pixels, based on the theme's design and stylesheet.
	//  *
	//  * Priority 0 to make it available to lower priority callbacks.
	//  *
	//  * @global int $content_width
	//  */
	// public function content_width() {
	// 	$GLOBALS['content_width'] = apply_filters( '<%= funcPrefix %>_content_width', 1024 );
	// }

	public function on_deactivate( $new_name, $new_theme, $old_theme ) {

		if ( $old_theme->get_stylesheet() != self::THEME_SLUG )
			return;

		$option_key = $old_theme->get_stylesheet() . '_activated';

		delete_option( $option_key );

		flush_rewrite_rules();
		do_action( '<%= funcPrefix %>_theme_deactivated' );
	}

	protected function check_dependencies(){

		if ( ! $this->dependencies_ok ) {

			$error_msgs = array();

			// check php version
			if ( version_compare( PHP_VERSION, $this->deps['php_version'], '<' ) ){
				$err_msg = sprintf( 'PHP version %s or higher', $this->deps['php_version'] );
				array_push( $error_msgs, $err_msg );
			}

			// check php extensions
			if ( array_key_exists( 'php_ext', $this->deps ) && is_array( $this->deps['php_ext'] ) ){
				foreach ( $this->deps['php_ext'] as $php_ext_key => $php_ext_val ){
					if ( ! extension_loaded( $php_ext_key ) ) {
						$err_msg = sprintf(
							'<a href="%s" target="_blank">%s</a> php extension to be installed',
							$php_ext_val['link'],
							$php_ext_val['name']
						);
						array_push( $error_msgs, $err_msg );
					}
				}
			}

			// check wp version
			// include an unmodified $wp_version
			include( ABSPATH . WPINC . '/version.php' );
			if ( version_compare( $wp_version, $this->deps['wp_version'], '<' ) ){
				$err_msg = sprintf( 'WordPress version %s or higher', $this->deps['wp_version'] );
				array_push( $error_msgs, $err_msg );
			}

			// check plugin dependencies
			if ( array_key_exists( 'plugins', $this->deps ) && is_array( $this->deps['plugins'] ) ){
				foreach ( $this->deps['plugins'] as $dep_plugin ){
					$err_msg = sprintf(
						' <a href="%s" target="_blank">%s</a> Plugin version %s (tested up to %s)',
						$dep_plugin['link'],
						$dep_plugin['name'],
						$dep_plugin['ver_at_least'],
						$dep_plugin['ver_tested_up_to']
					);
					// check by class
					if ( array_key_exists( 'class', $dep_plugin ) && strlen( $dep_plugin['class'] ) > 0 ){
						if ( ! class_exists( $dep_plugin['class'] ) ) {
							array_push( $error_msgs, $err_msg );
						}
					}
					// check by function
					if ( array_key_exists( 'function', $dep_plugin ) && strlen( $dep_plugin['function'] ) > 0 ){
						if ( ! function_exists( $dep_plugin['function'] ) ) {
							array_push( $error_msgs, $err_msg);
						}
					}
				}
			}

			// maybe set deactivate_notice and return false
			if ( count( $error_msgs ) > 0 ){
				$this->deactivate_notice = implode( '', array(
					'<h3>',self::THEME_NAME,' theme requires:</h3>',
					'<ul style="padding-left: 1em; list-style: inside disc;">',
						'<li>',implode ( '</li><li>' , $error_msgs ),'</li>',
					'</ul>',
				) );
				return false;
			}

			$this->dependencies_ok = true;
		}

		return true;
	}

	public function deactivate() {
		$default = wp_get_theme( WP_DEFAULT_THEME );
		if ( $default->exists() ) {
			add_action( 'admin_notices', array( $this, 'the_deactivate_notice' ) );
			switch_theme( $default->get_stylesheet() );
		} else {
			$last_core = WP_Theme::get_core_default_theme();
			if ( $last_core ) {
				add_action( 'admin_notices', array( $this, 'the_deactivate_notice' ) );
				switch_theme( $last_core->get_stylesheet() );
			} else {
				add_action( 'admin_notices', array( $this, 'the_deactivate_error_notice' ) );
			}
		}
	}

	public function the_deactivate_notice(){
		echo implode( '', array(
			'<div class="notice error">',
				$this->deactivate_notice,
				'<p>The theme will be deactivated.</p>',
			'</div>',
		) );
	}

	public function the_deactivate_error_notice(){
		echo implode( '', array(
			'<div class="notice error">',
				$this->deactivate_notice,
				'<p>An error occurred when deactivating the theme. It needs to be deactivated manually.</p>',
			'</div>',
		) );
	}

	protected function init_options() {
		update_option( '<%= funcPrefix %>_version', self::VERSION );
		add_option( '<%= funcPrefix %>_db_version', self::DB_VERSION );
	}

	// include files to register post types and taxonomies
	protected function register_post_types_and_taxs() {
		include_once( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_post_types_taxs.php' );
		<%= funcPrefix %>_include_post_types_taxs();
	}

	// include files to add user roles and capabilities
	protected function add_roles_and_capabilities() {
		include_once( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_roles_capabilities.php' );
		if ( function_exists( '<%= funcPrefix %>_include_roles_capabilities' ) ) <%= funcPrefix %>_include_roles_capabilities();
	}

	protected function auto_include() {
		// init cmb2
		if ( file_exists( self::theme_dir_path() . 'vendor/webdevstudios/cmb2/init.php' ) ) {
			require_once self::theme_dir_path() . 'vendor/webdevstudios/cmb2/init.php';
		}
		// include template_functions and _tags
		if ( file_exists( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_fun.php' ) ) {
			include_once( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_fun.php' );
			if ( function_exists( '<%= funcPrefix %>_include_fun' ) ) <%= funcPrefix %>_include_fun();
		}
		if ( file_exists( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_template_functions.php' ) ) {
			include_once( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_template_functions.php' );
			if ( function_exists( '<%= funcPrefix %>_include_template_functions' ) ) <%= funcPrefix %>_include_template_functions();
		}
		if ( file_exists( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_template_tags.php' ) ) {
			include_once( self::theme_dir_path() . 'inc/<%= funcPrefix %>_include_template_tags.php' );
			if ( function_exists( '<%= funcPrefix %>_include_template_tags' ) ) <%= funcPrefix %>_include_template_tags();
		}
	}

	// check DB_VERSION and require the update class if necessary
	protected function maybe_update() {
		if ( get_option( '<%= funcPrefix %>_db_version' ) < self::DB_VERSION ) {
			// require_once( self::theme_dir_path() . 'inc/class-<%= funcPrefix %>_update.php' );
			// new <%= upperFirst( funcPrefix ) %>_Update();
			// class <%= upperFirst( funcPrefix ) %>_Update is missing ??? !!!
		}
	}

	public function load_textdomain(){
		load_theme_textdomain(
			'wde_replace_textDomain',
			self::theme_dir_path() . 'languages'
		);
		// just a test string to ensure generated pot file will not be empty
		$test = __( 'test', '<%= funcPrefix %>' );
	}

	public function enqueue_parent_styles(){
		// if theme is childtheme, enqueue parent style and set parent as dependency
		if ( get_stylesheet_directory_uri() !== get_template_directory_uri() ) {
			$parent_style = 'style';
			wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css' );
			array_push( $this->style_deps, $parent_style );
		}
	}

	public function enqueue_styles(){

		// // theme style.css, doesn't contain any style, just theme details
		// // we don't need to enqueue it so. Just WP wants it to be existing
		// wp_enqueue_style( '<%= funcPrefix %>', self::theme_dir_url() . '/style.css' );
		// array_push($this->style_deps, '<%= funcPrefix %>' );
		if ( defined( 'self::THEME_PARENT' ) && 'enfold' === self::THEME_PARENT && get_stylesheet_directory_uri() !== get_template_directory_uri() ) {
			// if parent is enfold we need to deregister the child style.css again
			wp_deregister_style( 'avia-style' );
		}

		// the 'real' theme stylesheet, contains the style
		wp_enqueue_style( 'frontend', self::theme_dir_url() . '/css/frontend.min.css', $this->style_deps, false, 'all' );
	}

	public function enqueue_scripts(){
		<%= typeof template !== 'undefined' ? '// ' : '' %>if ( get_stylesheet_directory_uri() !== get_template_directory_uri() && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		<%= typeof template !== 'undefined' ? '// ' : '' %>	wp_enqueue_script( 'comment-reply' );
		<%= typeof template !== 'undefined' ? '// ' : '' %>}
	}

	public function enqueue_scripts_admin(){
		// $handle = '<%= funcPrefix %>_script_admin';

		// wp_register_script(
		// 	$handle,
		// 	self::theme_dir_url() . '/js/' . $handle  . '.min.js',
		// 	array(
		// 		'wp-hooks',
		// 		'wp-api',
		// 		'wp-data',
		// 		'wp-i18n',
		// 	)
		// );

		// wp_localize_script( $handle, '<%= funcPrefix %>_data', array() );
		// wp_set_script_translations( $handle, '<%= funcPrefix %>', self::theme_dir_path() . 'languages' );
		// wp_enqueue_script( $handle );
	}

}

function <%= funcPrefix %>_<%= snakeCase( name ) %>() {
	return <%= project_class %>::get_instance();
}
<%= funcPrefix %>_<%= snakeCase( name ) %>();

?>