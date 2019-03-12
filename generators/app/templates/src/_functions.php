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

include_once( dirname( __FILE__ ) . '/vendor/autoload.php' );
<%
	var parent_class = 'Theme';
	if ( typeof template !== 'undefined' ) {
		switch( template ) {
			case 'enfold':
				parent_class = 'Childtheme_Enfold';
				break;
			default:
				parent_class = 'Childtheme';
		}
	}
%>
class <%= project_class %> extends croox\wde\<%= parent_class %> {

	public function hooks(){
        parent::hooks();
		// // set content_width
		// add_action( 'after_setup_theme', array( $this, 'content_width' ), 0 );
	}

	// /**
	//  * Set the content width in pixels, based on the theme's design and stylesheet.
	//  *
	//  * Priority 0 to make it available to lower priority callbacks.
	//  *
	//  * @global int $content_width
	//  */
	// public function content_width() {
	// 	$GLOBALS['content_width'] = apply_filters( $this->prefix . '_content_width', 1024 );
	// }

	public function enqueue_scripts_admin(){
        // parent::enqueue_scripts_admin();
		// $handle = $this->prefix . '_script_admin';

		// wp_register_script(
		// 	$handle,
		// 	$this->get_dir_url() . '/js/' . $handle  . '.min.js',
		// 	array(
		// 		'wp-hooks',
		// 		'wp-api',
		// 		'wp-data',
		// 		'wp-i18n',
		// 	)
		// );

		// wp_localize_script( $handle, $this->prefix . '_data', array() );
		// wp_set_script_translations( $handle, $this->prefix . '', $this->get_dir_path() . 'languages' );
		// wp_enqueue_script( $handle );
	}
}

function <%= funcPrefix %>_<%= snakeCase( name ) %>() {

	$init_args = array(
		'version'	=> 'wde_replace_version',
		'slug'	=> 'wde_replace_name',
		'name'	=> 'wde_replace_displayName',<% if ( typeof template !== 'undefined' ) { %>
		'parent'	=> 'wde_replace_template',<% } %>
		'prefix'	=> 'wde_replace_funcPrefix',
		'textdomain'	=> 'wde_replace_textDomain',
		'FILE_CONST'	=> __FILE__,
		'db_version'	=> 0,
	);

	return <%= project_class %>::get_instance( $init_args );
}
<%= funcPrefix %>_<%= snakeCase( name ) %>();

?>