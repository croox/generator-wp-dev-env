<?php

namespace <%= funcPrefix %>;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

use croox\wde\Block;
use croox\wde\utils\Arr;

class <%= block.class_name %> extends Block {

	protected function initialize() {
		// Block type name excluding namespace. Use dashes.
		$this->name = str_replace( '_', '-',
			sanitize_title_with_dashes( '<%= block.name %>' )
		);

		$this->project_class_name = '<%= project_class %>';
	}

	/**
	 * Example hooks
	 */
	/*
	public function hooks() {
		parent::hooks();
		$prefix = $this->project_class_name::get_instance()->prefix;
		add_filter( "{$prefix}_block_{$this->name}_script_deps_editor", array( $this, 'script_deps_editor' ) );
		add_filter( "{$prefix}_block_{$this->name}_localize_data_editor", array( $this, 'localize_data_editor' ) );
		add_filter( "{$prefix}_block_{$this->name}_script_deps_frontend", array( $this, 'script_deps_frontend' ) );
		add_filter( "{$prefix}_block_{$this->name}_localize_data_frontend", array( $this, 'localize_data_frontend' ) );
		add_filter( "{$prefix}_block_{$this->name}_style_deps_editor", array( $this, 'style_deps_editor' ) );
		add_filter( "{$prefix}_block_{$this->name}_style_deps_frontend", array( $this, 'style_deps_frontend' ) );
	}
	public function script_deps_editor( $deps ) {
		return $deps;
	}
	public function localize_data_editor( $localize_data ) {
		return $localize_data;
	}
	public function script_deps_frontend( $deps ) {
		return $deps;
	}
	public function localize_data_frontend( $localize_data ) {
		return $localize_data;
	}
	public function style_deps_editor( $deps ) {
		return $deps;
	}
	public function style_deps_frontend( $deps ) {
		return $deps;
	}
	*/

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
	/*
	public function render( $attributes, $name ) {
		// // Decode stringified Block Attributes
		// $attributes_stringified_keys = array();
		// $attributes = Block::decode_attributes( $attributes, $attributes_stringified_keys );

		$class_name = implode( ' ', array_filter( array(
			'wp-block-<%= funcPrefix %>-' . $this->name,
			Arr::get( $attributes, 'className', '' ),
		), 'strlen' ) );

		$html_arr = array(
			'<div ',
				'class="' . $class_name . '" ',
				'data-<%= block.name %>="' . htmlspecialchars( json_encode( $attributes ), ENT_QUOTES, 'UTF-8' ) . '" ',
			'>',
				// markup
			'</div>',
		);

		return implode( '', $html_arr );
	}
	*/
}
