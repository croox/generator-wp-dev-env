<?php
/**
 * Partial template for content in page.php
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<div class="entry-header">

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

	</div><!-- .entry-header -->

	<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>

	<div class="entry-content">

		<?php the_content(); ?>

		<?php
		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . __( 'Pages:', '<%= textDomain %>' ),
				'after'  => '</div>',
			)
		);
		?>

	</div><!-- .entry-content -->

	<div class="entry-footer">

		<?php edit_post_link( __( 'Edit', '<%= textDomain %>' ), '<span class="edit-link">', '</span>' ); ?>

	</div><!-- .entry-footer -->

</article><!-- #post-## -->
