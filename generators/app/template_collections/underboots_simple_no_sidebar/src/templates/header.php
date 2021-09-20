<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package <%= name %>
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'WP_Bootstrap_Navwalker' ) ) {
	require_once( <%= funcPrefix %>\<%= startCase( kebabCase( funcPrefix ) ) %>::get_instance()->dir_path . 'vendor/wp-bootstrap/wp-bootstrap-navwalker/class-wp-bootstrap-navwalker.php' );
}

$container = get_theme_mod( '<%= funcPrefix %>_container_type' );

$custom_header = get_custom_header();
$header_width = $custom_header && property_exists( $custom_header, 'width' ) ? $custom_header->width : 1200;
$header_height = $custom_header && property_exists( $custom_header, 'height' ) ? $custom_header->height : 400;
$header_image_class = 'header-image';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">

	<header>

		<div id="wrapper-navbar" itemscope itemtype="http://schema.org/WebSite">

			<a class="skip-link sr-only sr-only-focusable" href="#content"><?php esc_html_e( 'Skip to content', '<%= textDomain %>' ); ?></a>

			<nav class="navbar navbar-expand-md navbar-dark bg-primary">

				<div class="<?php echo 'container' === $container ? 'container' : 'd-flex'; ?> flex-row-reverse w-100">

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle navigation', '<%= textDomain %>' ); ?>">
						<span class="navbar-toggler-icon"></span>
					</button>

					<!-- Your site title as branding in the menu -->
					<?php if ( has_custom_logo() ) : ?>
						<?php the_custom_logo(); ?>
					<?php else : ?>
						<a class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" itemprop="url"><?php bloginfo( 'name' ); ?></a>
					<?php endif; ?><!-- end custom logo -->

					<!-- The WordPress Menu goes here -->
					<?php wp_nav_menu(
						array(
							'theme_location'  => 'primary',
							'container_class' => 'collapse navbar-collapse ',
							'container_id'    => 'navbarNavDropdown',
							'menu_class'      => 'navbar-nav',
							'fallback_cb'     => '',
							'menu_id'         => 'main-menu',
							'depth'           => 2,
							'walker'          => new \WP_Bootstrap_Navwalker(),
						)
					); ?>

				</div>

			</nav><!-- .site-navigation -->

		</div><!-- #wrapper-navbar end -->

		<div
			id="wrapper-header-image"
			class="<?php echo 'container' === $container ? 'container' : ''; ?>"
			style="height: <?php echo $header_height; ?>px"
		>

			<?php if ( has_custom_header() ) : ?>
				<img
					class="<?php echo $header_image_class; ?>"
					src="<?php header_image(); ?>"
					height="<?php echo $header_height; ?>"
					width="<?php echo $header_width; ?>"
					alt=""
					style="height: <?php echo $header_height; ?>px"
				/>
			<?php endif; ?>

			<?php if ( function_exists( 'yoast_breadcrumb' ) ) : ?>
				<div class="wpseo-breadcrumbs">
					<?php yoast_breadcrumb(); ?>
				</div>
			<?php endif; ?>

		</div><!-- #wrapper-header-image end -->

		<div
			id="wrapper-header-meta"
			class="header-meta p-2"
		>
			<div
				class="d-flex <?php echo 'container' === $container ? 'container' : ''; ?>"
			>
				<?php echo get_search_form( true ); ?>
			</div><!-- .row end -->
		</div><!-- .row end -->

	</header>
