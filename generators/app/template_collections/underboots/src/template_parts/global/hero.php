<?php
/**
 * Hero setup.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<?php if ( is_active_sidebar( 'hero' ) || is_active_sidebar( 'statichero' ) || is_active_sidebar( 'herocanvas' ) ) : ?>

	<div class="wrapper" id="wrapper-hero">

		<?php get_template_part( 'template_parts/sidebar/sidebar', 'hero' ); ?>

		<?php get_template_part( 'template_parts/sidebar/sidebar', 'herocanvas' ); ?>

		<?php get_template_part( 'template_parts/sidebar/sidebar', 'statichero' ); ?>

	</div>

<?php endif; ?>
