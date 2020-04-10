<?php
/**
 * The template for displaying the author pages.
 *
 * Learn more: https://codex.wordpress.org/Author_Templates
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

		<header class="page-header author-header">

			<?php
			if ( isset( $_GET['author_name'] ) ) {
				$curauth = get_user_by( 'slug', $author_name );
			} else {
				$curauth = get_userdata( intval( $author ) );
			}
			?>

			<h1><?php echo esc_html__( 'About:', '<%= textDomain %>' ) . ' ' . esc_html( $curauth->nickname ); ?></h1>

			<?php if ( ! empty( $curauth->ID ) ) : ?>
				<?php echo get_avatar( $curauth->ID ); ?>
			<?php endif; ?>

			<?php if ( ! empty( $curauth->user_url ) || ! empty( $curauth->user_description ) ) : ?>
				<dl>
					<?php if ( ! empty( $curauth->user_url ) ) : ?>
						<dt><?php esc_html_e( 'Website', '<%= textDomain %>' ); ?></dt>
						<dd>
							<a href="<?php echo esc_url( $curauth->user_url ); ?>"><?php echo esc_html( $curauth->user_url ); ?></a>
						</dd>
					<?php endif; ?>

					<?php if ( ! empty( $curauth->user_description ) ) : ?>
						<dt><?php esc_html_e( 'Profile', '<%= textDomain %>' ); ?></dt>
						<dd><?php esc_html_e( $curauth->user_description ); ?></dd>
					<?php endif; ?>
				</dl>
			<?php endif; ?>

			<h2><?php echo esc_html( 'Posts by', '<%= textDomain %>' ) . ' ' . esc_html( $curauth->nickname ); ?>:</h2>

		</header><!-- .page-header -->

		<ul>

			<!-- The Loop -->
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<li>
						<?php
						printf(
							'<a rel="bookmark" href="%1$s" title="%2$s %3$s">%3$s</a>',
							esc_url( apply_filters( 'the_permalink', get_permalink( $post ), $post ) ),
							esc_attr( __( 'Permanent Link:', '<%= textDomain %>' ) ),
							the_title( '', '', false )
						);
						?>
						<?php <%= funcPrefix %>_posted_on(); ?>
						<?php esc_html_e( 'in', '<%= textDomain %>' ); ?>
						<?php the_category( '&' ); ?>
					</li>
				<?php endwhile; ?>

			<?php else : ?>

				<?php get_template_part( 'template_parts/loop/content', 'none' ); ?>

			<?php endif; ?>

			<!-- End Loop -->

		</ul>

		<!-- The pagination component -->
		<?php <%= funcPrefix %>_pagination(); ?>
	</div><!-- #content -->
</main><!-- #main -->

<?php get_footer(); ?>
