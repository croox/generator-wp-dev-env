<?php
/**
 * Left sidebar check.
 *
 * @package unterhose
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$sidebar_pos = get_theme_mod( 'unte_sidebar_position' );
?>

<?php if ( 'left' === $sidebar_pos || 'both' === $sidebar_pos ) : ?>
	<?php get_template_part( 'template_parts/sidebar/sidebar', 'left' ); ?>
<?php endif; ?>

<div class="col-md content-area" id="primary">
