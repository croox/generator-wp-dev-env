<?php
/**
 * Block Name: <%= block.displayName %>
 *
 * This is the template that displays the <%= block.name %> block.
 */

// get image field (array)
$avatar = get_field('avatar');

// create id attribute for specific styling
$id = '<%= block.name %>-' . $block['id'];

// create align class ("alignwide") from block setting ("wide")
$align_class = $block['align'] ? 'align' . $block['align'] : '';

?>
<blockquote id="<?php echo $id; ?>" class="<%= block.name %> <?php echo $align_class; ?>">
    <p><?php the_field('<%= block.name %>'); ?></p>
    <cite>
    	<img src="<?php echo $avatar['url']; ?>" alt="<?php echo $avatar['alt']; ?>" />
    	<span><?php the_field('author'); ?></span>
    </cite>
</blockquote>
<style type="text/css">
	#<?php echo $id; ?> {
		background: <?php the_field('background_color'); ?>;
		color: <?php the_field('text_color'); ?>;
	}
</style>