<?php

namespace <%= funcPrefix %>;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

use croox\wde;

class <%= block.class_name %> extends wde\Block {

	protected function initialize() {
		// Block type name excluding namespace. Use dashes.
		$this->name = str_replace( '_', '-',
			sanitize_title_with_dashes( '<%= block.name %>' )
		);

		$this->project_class_name = '<%= project_class: %>';
	}

	protected function setup_handles() {
		$prefix = $this->project_class_name::get_instance()->prefix;
		$_name = str_replace( '-', '_', $this->name );

		// Define handles to enque admin and frontend assets.
		// If asset not needed, just comment it out.
		$this->handles = array(
			'style_admin'     => $prefix . '_block_' . $_name . '_admin',
			'script_admin'    => $prefix . '_block_' . $_name . '_admin',
			'style_frontend'  => $prefix . '_block_' . $_name . '_frontend',
			'script_frontend' => $prefix . '_block_' . $_name . '_frontend',
		);
	}

	/**
	 * Render the Block in Frontend
	 *
	 * The Block Frontend will be php rendered, if this method is existing.
	 * The registerBlockType save method should return null in that case.
	 *
	 * If this method is not existing, the editor script will
	 * react render the block,
	 * and store the rendered markup within the post_cotent,
	 * when it updates the post.
	 * In that Case, the registerBlockType save method returns the code to render the markup.
	 *
	 * @return string		The rendered html string
	 */
	public function render( $attributes, $name ) {
		// Decode stringified Block Attributes
		$attributes_stringified_keys = array();
		$attributes = wde\Block::decode_attributes( $attributes, $attributes_stringified_keys );

		$html_arr = array(
			'<div ',
				'class="<%= 'wp-block-' + funcPrefix + '-' + block.name %>" ',
				'data-<%= block.name %>="' . htmlspecialchars( json_encode( $attributes ), ENT_QUOTES, 'UTF-8' ) . '" ',
			'>',
				// markup
			'</div>',
		);

		return implode( '', $html_arr );
	}
}
