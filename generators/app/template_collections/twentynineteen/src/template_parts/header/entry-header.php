<?php
/**
 * Displays the post header
 *
 * @package WordPress
 * @subpackage <%= name %>
 */

$discussion = ! is_page() && <%= funcPrefix %>_can_show_post_thumbnail() ? <%= funcPrefix %>_get_discussion_data() : null; ?>

<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

<?php if ( ! is_page() ) : ?>
<div class="entry-meta">
	<?php <%= funcPrefix %>_posted_by(); ?>
	<?php <%= funcPrefix %>_posted_on(); ?>
	<span class="comment-count">
		<?php
		if ( ! empty( $discussion ) ) {
			<%= funcPrefix %>_discussion_avatars_list( $discussion->authors );
		}
		?>
		<?php <%= funcPrefix %>_comment_count(); ?>
	</span>
	<?php
	// Edit post link.
		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers. */
					__( 'Edit <span class="screen-reader-text">%s</span>', '<%= textDomain %>' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">' . <%= funcPrefix %>\SVG_Icons::get_icon_svg( 'edit', 16 ),
			'</span>'
		);
	?>
</div><!-- .meta-info -->
<?php endif; ?>
