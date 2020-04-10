<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
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

		<?php if ( have_posts() ) : ?>

			<?php /* Start the Loop */ ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template_parts/loop/content', get_post_format() );
				?>

			<?php endwhile; ?>

		<?php else : ?>

			<?php get_template_part( 'template_parts/loop/content', 'none' ); ?>

		<?php endif; ?>

		<!-- The pagination component -->
		<?php <%= funcPrefix %>_pagination(); ?>
	</div><!-- #content -->

</main><!-- #main -->


<?php get_footer(); ?>
