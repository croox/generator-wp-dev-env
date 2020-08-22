/**
 * Wordpress dependencies
 */
const { unregisterBlockType } = wp.blocks;
const { select } = wp.data;
const { domReady } = wp;

const removeBlocks = () => domReady( () => [
	// 'core/columns',
	// 'core/column',
	// 'wp-bootstrap-blocks/button',
].map( blockType => {
	const content = select( 'core/editor' ).getCurrentPostAttribute( 'content' );
	if ( content && content.includes( '<!-- wp:' + blockType.replace( 'core/', '' ) ) ) {
		console.log( 'Can not unregister blockType "' + blockType + '" because current post contains that block' );
		return;
	}
	unregisterBlockType( blockType );
} ) );

export default removeBlocks;
