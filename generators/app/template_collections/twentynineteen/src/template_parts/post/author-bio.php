<?php
/**
 * The template for displaying Author info
 *
 * @package WordPress
 * @subpackage <%= name %>
 */

if ( (bool) get_the_author_meta( 'description' ) ) : ?>
<div class="author-bio">
	<h2 class="author-title">
		<span class="author-heading">
			<?php
			printf(
				/* translators: %s: post author */
				__( 'Published by %s', '<%= textDomain %>' ),
				esc_html( get_the_author() )
			);
			?>
		</span>
	</h2>
	<p class="author-description">
		<?php the_author_meta( 'description' ); ?>
		<a class="author-link" href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author">
			<?php _e( 'View more posts', '<%= textDomain %>' ); ?>
		</a>
	</p><!-- .author-description -->
</div><!-- .author-bio -->
<?php endif; ?>
