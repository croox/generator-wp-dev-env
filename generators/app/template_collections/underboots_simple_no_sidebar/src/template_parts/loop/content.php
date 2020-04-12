<?php
/**
 * Post rendering content according to caller of get_template_part.
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<div class="entry-header">

		<?php
		the_title(
			sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
			'</a></h2>'
		);
		?>

		<?php if ( 'post' == get_post_type() ) : ?>

			<div class="entry-meta">
				<?php <%= funcPrefix %>_posted_on(); ?>
			</div><!-- .entry-meta -->

		<?php endif; ?>

	</div><!-- .entry-header -->

	<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>

	<div class="entry-content">

		<?php the_excerpt(); ?>

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

		<?php <%= funcPrefix %>_entry_footer(); ?>

	</div><!-- .entry-footer -->

</article><!-- #post-## -->
