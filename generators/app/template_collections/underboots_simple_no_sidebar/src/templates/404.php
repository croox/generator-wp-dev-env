<?php
/**
 * The template for displaying 404 pages (not found).
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

		<section class="error-404 not-found">

			<header class="page-header">

				<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', '<%= textDomain %>' ); ?></h1>

			</header><!-- .page-header -->

			<div class="page-content">

				<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', '<%= textDomain %>' ); ?></p>

				<?php get_search_form(); ?>

			</div><!-- .page-content -->

		</section><!-- .error-404 -->

	</div><!-- #content -->
</main><!-- #main -->

<?php get_footer(); ?>
