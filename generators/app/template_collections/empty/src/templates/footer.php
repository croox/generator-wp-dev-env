<?php
/**
 * The template for displaying the footer
 *
 * https://github.com/Automattic/_s/blob/master/footer.php
 *
 * Contains the closing of the #content div and all content after.
 *
 * **Note:**
 * This file is required since Wordpress.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= name %>
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', '<%= textDomain %>' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', '<%= textDomain %>' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s', '<%= textDomain %>' ), '<%= textDomain %>' );
				?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
