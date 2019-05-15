<?php
/**
 * Left sidebar check.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$sidebar_pos = get_theme_mod( '<%= funcPrefix %>_sidebar_position' );
?>

<?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ) : ?>
	<?php get_template_part( 'template_parts/sidebar/sidebar', 'left' ); ?>
<?php endif; ?>

<div class="col-md content-area" id="primary">
