<?php
/**
 * The sidebar containing the main widget area
 *
 * https://github.com/Automattic/_s/blob/master/sidebar.php
 *
 * **Note:**
 * A `sidebar-1` needs to be registered to make use of this file.
 * This file is required since Wordpress `3.0.0`.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= name %>
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
