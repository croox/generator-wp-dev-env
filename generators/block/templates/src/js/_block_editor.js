/**
 * Admin script for <%= block.displayName %> Block
 *
 * Block registered by: <%= block.class_name %>::register_block
 * Enqueued by: <%= block.class_name %>::enqueue_assets_frontend
 *
 * Enqueued in editor only
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

/**
 * Internal dependencies
 */
// no internal dependencies yet

// // access localized data
// const localizedData = <%= block.handle %>_data;

// https://wordpress.org/gutenberg/handbook/block-api/#register-block-type
registerBlockType( '<%= funcPrefix %>/<%= block.name %>', {

	title: __( '<%= block.displayName %>', 'wde_replace_textDomain' ),

	// https://wordpress.org/gutenberg/handbook/block-api/#icon-optional
	icon: 'universal-access-alt',

	// [ common | formatting | layout | widgets | embed ] https://wordpress.org/gutenberg/handbook/block-api/#category
	category: 'common',

	// https://wordpress.org/gutenberg/handbook/block-api/attributes/
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},

    // The edit function describes the structure of your block in the context of the editor.
    // This represents what the editor will render when the block is used.
	edit( { className, attributes, setAttributes } ) {

		const {
			content,
			alignment,
		} = attributes;

		const onChangeContent = newContent => setAttributes( { content: newContent } );

		const onChangeAlignment = newAlignment => setAttributes( { alignment: newAlignment } );

		return <>
			<div className={ classnames( [attributes.classname, 'align-' + alignment, className] ) }>

				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>

				<RichText
					style={ { textAlign: alignment } }
					tagName={ 'p' }
					onChange={ onChangeContent }
					value={ content }
				/>

			</div>
		</>;
	},

    // The save function defines the way in which the different attributes should be combined into the final markup,
    // which is then serialized by Gutenberg into post_content.
    save( { attributes } ) {

		const {
			content,
			alignment,
		} = attributes;

		const className = 'wp-block-<%= funcPrefix %>-<%= block.name %>';

		return <>
			<div className={ classnames( [attributes.classname, 'align-' + alignment, className] ) }>
				<RichText.Content
					tagName={ 'p' }
					value={ content }
				/>
			</div>
		</>;
	},

} );
