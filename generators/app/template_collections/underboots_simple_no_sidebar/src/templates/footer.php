<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$container = get_theme_mod( '<%= funcPrefix %>_container_type' );
?>

<footer id="colophon" class="site-footer <?php echo esc_attr( $container ); ?>">

	<div class="site-info">

		<?php <%= funcPrefix %>_site_info(); ?>

	</div><!-- .site-info -->

</footer><!-- #colophon -->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>
