<?php
/**
 * The template for displaying search results pages.
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
	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">

				<h1 class="page-title">
					<?php
					printf(
						/* translators: %s: query term */
						esc_html__( 'Search Results for: %s', '<%= textDomain %>' ),
						'<span>' . get_search_query() . '</span>'
					);
					?>
				</h1>

			</header><!-- .page-header -->

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php
				/**
				 * Run the loop for the search to output the results.
				 * If you want to overload this in a child theme then include a file
				 * called content-search.php and that will be used instead.
				 */
				get_template_part( 'template_parts/loop/content', 'search' );
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
