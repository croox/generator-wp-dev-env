<?php

namespace <%= funcPrefix %>;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

use croox\wde;

class <%= startCase( kebabCase( funcPrefix ) ) %> extends wde\<%= parent_class %> {

	// public function hooks(){
    //     parent::hooks();
	// 	add_action( 'init', array( $this, 'do_something_on_init' ), 10 );
	// }

	// public function do_something_on_init(){
	// 	// ...
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