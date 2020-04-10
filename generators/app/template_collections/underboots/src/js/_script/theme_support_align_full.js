/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * Support full block align for one column layouts
 *
 */
$( document ).ready( function( $ ) {
	$( "[class^='wp-block-'].alignfull, [class*=' wp-block-'].alignfull" ).each( function() {
		const $this = $( this );

		// only resize one column layout
		if ( 1 !== $this.closest( '.row' ).children().length )
			return;

		const resize = () => {
			const $parent = $this.parent();
			const $wrapper = $this.closest( '.wrapper' );
			if ( $wrapper ) {
				$this.css( {
					// position: 'absolute',
					width: $wrapper.outerWidth(),
					maxWidth: $wrapper.outerWidth(),
					left: - $parent.offset().left,
				} );
			}
		}
		// resize now
		resize();
		// debounced window resize event
		let timeout = false;
		window.addEventListener( 'resize', () => {
			clearTimeout( timeout );
			timeout = setTimeout( () => {
				resize();
			}, 100 );
		} );

	} );
} );