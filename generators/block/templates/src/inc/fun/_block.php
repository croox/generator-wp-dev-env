<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function <%= block.handle %>() {
	return <%= funcPrefix %>\<%= block.class_name %>::get_instance();
}
<%= block.handle %>();
