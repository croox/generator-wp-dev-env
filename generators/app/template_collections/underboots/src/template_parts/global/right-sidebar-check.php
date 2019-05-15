<?php
/**
 * Right sidebar check.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

</div><!-- #closing the primary container from /template_parts/global/left-sidebar-check.php -->

<?php $sidebar_pos = get_theme_mod( '<%= funcPrefix %>_sidebar_position' ); ?>

<?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ) : ?>

	<?php get_template_part( 'template_parts/sidebar/sidebar', 'right' ); ?>

<?php endif; ?>
