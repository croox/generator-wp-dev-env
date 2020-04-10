<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();

$container = get_theme_mod( '<%= funcPrefix %>_container_type' );

?>

<main class="site-main my-3" id="main">
	<div class="p4 <?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'template_parts/loop/content', 'page' ); ?>

			<?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;
			?>

		<?php endwhile; // end of the loop. ?>

	</div><!-- #content -->
</main><!-- #main -->



<?php get_footer(); ?>
