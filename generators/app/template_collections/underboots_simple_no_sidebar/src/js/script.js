/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
// const {	__ } = wp.i18n;

/**
 * Internal dependencies
 */
// import customized bootstrap, may be stripped.
import './<%= funcPrefix %>_script/bootstrapCustom';
import './<%= funcPrefix %>_script/skip_link_focus_fix';
import './<%= funcPrefix %>_script/theme_support_align_full';

// // access localized data.
// const localizedData = <%= funcPrefix %>_script_data;

$( document ).ready( function( $ ) {

	// // log bootstrap carousel
	// console.log( '$.fn.carousel', $.fn.carousel );

} );
