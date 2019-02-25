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
	const PLUGIN_SLUG = 'wde_replace_name';
	const PLUGIN_NAME = 'wde_replace_displayName';
	const PLUGIN_PREFIX = 'wde_replace_funcPrefix';
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
		'php_version' => 'wde_replace_phpRequiresAtLeast',		// required php version
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

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->hooks();
		}
		return self::$instance;
	}

	public function hooks() {
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'on_deactivate' ) );
		register_uninstall_hook( __FILE__, array( __CLASS__, 'on_uninstall' ) );
		add_action( 'plugins_loaded', array( $this, 'start' ), 9 );
	}

	public static function plugin_dir_url(){
		return plugins_url( '', __FILE__ );		// no trailing slash
	}

	public static function plugin_dir_path(){
		return plugin_dir_path( __FILE__ );		// trailing slash
	}

	public static function plugin_dir_basename(){
		return basename( dirname( __FILE__ ) );	// no trailing slash
	}

	public static function plugin_file(){
		return __FILE__;						// plugin file abs path
	}


	public function start() {
		if ( $this->check_dependencies() ){
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
			$this->register_post_types_and_taxs();
			$this->add_roles_and_capabilities();
			$this->maybe_update();	// I think mass a plugin update does not run activation hooks
			$this->auto_include();
			do_action( '<%= funcPrefix %>_plugin_loaded' );
		} else {
			add_action( 'admin_init', array( $this, 'deactivate' ) );
		}

	}

	public function activate() {
		if ( $this->check_dependencies() ){
			$this->init_options();
			$this->register_post_types_and_taxs();
			$this->add_roles_and_capabilities();
			// hook the register post type functions, because init is to late
			do_action( '<%= funcPrefix %>_on_activate_before_flush' );
			flush_rewrite_rules();
			$this->maybe_update();
			do_action( '<%= funcPrefix %>_plugin_activated' );
		} else {
			add_action( 'admin_init', array( $this, 'deactivate' ) );
			wp_die(
				$this->deactivate_notice
				. '<p>The plugin will not be activated.</p>'
				. '<p><a href="' . admin_url( 'plugins.php' ) . '">&laquo; Return to Plugins</a></p>'
			);
		}
	}

	public function on_deactivate() {
		$this->add_roles_and_capabilities();
		do_action( '<%= funcPrefix %>_on_deactivate_before_flush' );
		flush_rewrite_rules();
		do_action( '<%= funcPrefix %>_plugin_deactivated' );
	}

	public static function on_uninstall() {
		do_action( '<%= funcPrefix %>_plugin_uninstalled' );
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
					'<h3>',self::PLUGIN_NAME,' plugin requires:</h3>',
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
		add_action( 'admin_notices', array( $this, 'the_deactivate_notice' ) );
		deactivate_plugins( plugin_basename( __FILE__ ) );
	}

	public function the_deactivate_notice(){
		echo implode( '', array(
			'<div class="notice error">',
				$this->deactivate_notice,
				'<p>The plugin will be deactivated.</p>',
			'</div>',
		) );
	}

	protected function init_options() {
		update_option( '<%= funcPrefix %>_version', self::VERSION );
		add_option( '<%= funcPrefix %>_db_version', self::DB_VERSION );
	}

	// include files to register post types and taxonomies
	protected function register_post_types_and_taxs() {
		include_once( self::plugin_dir_path() . 'inc/<%= funcPrefix %>_include_post_types_taxs.php' );
		<%= funcPrefix %>_include_post_types_taxs();
	}

	// include files to add user roles and capabilities
	protected function add_roles_and_capabilities() {
		include_once( self::plugin_dir_path() . 'inc/<%= funcPrefix %>_include_roles_capabilities.php' );
		<%= funcPrefix %>_include_roles_capabilities();
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
			// require_once( self::plugin_dir_path() . 'inc/class-<%= funcPrefix %>_update.php' );
			// new <%= upperFirst( funcPrefix ) %>_Update();
			// class <%= upperFirst( funcPrefix ) %>_Update is missing ??? !!!
		}
	}

	public function load_textdomain(){
		load_plugin_textdomain(
			'wde_replace_textDomain',
			false,
			self::plugin_dir_basename() . '/languages'
		);
		// just a test string to ensure generated pot file will not be empty
		$test = __( 'test', '<%= funcPrefix %>' );
	}

}

function <%= funcPrefix %>_<%= snakeCase( name ) %>() {
	return <%= project_class %>::get_instance();
}
<%= funcPrefix %>_<%= snakeCase( name ) %>();

?>