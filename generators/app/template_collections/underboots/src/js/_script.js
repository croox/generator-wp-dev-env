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
import './unte_script/bootstrapCustom';
import './unte_script/skip_link_focus_fix';

// // access localized data.
// const localizedData = unte_script_data;

$( document ).ready( function( $ ) {

	// log bootstrap carousel
	console.log( '$.fn.carousel', $.fn.carousel );

} );
