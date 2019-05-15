<?php

namespace unte;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

use croox\wde;

class Unte extends wde\Theme {

	// public function hooks(){
    //     parent::hooks();
	// 	add_action( 'init', array( $this, 'do_something_on_init' ), 10 );
	// }

	// public function do_something_on_init(){
	// 	// ...
	// }

	public function enqueue_scripts(){
        parent::enqueue_scripts();

		$handle = $this->prefix . '_script';
		$_src = '/js/' . $handle . '.min.js';
		$src = $this->get_dir_url() . $_src;
		$ver = $this->get_version() . '.' . filemtime( $this->get_dir_path() .$_src );

		wp_register_script(
			$handle,
			$src,
			array(
				'jquery',
				// 'wp-i18n',
			),
			$ver,
			true // $in_footer, default false
		);

		// wp_localize_script( $handle, $handle . '_data', array() );

		wp_set_script_translations(
			$handle,
			$this->textdomain,
			$this->get_dir_path() . 'languages'
		);

		wp_enqueue_script( $handle );
	}

}