
[README](../../../../../README.md)
└── [src](../readme.md)
    └── inc

## `.src/inc`

This directory contains subdirectories with `php` files.

### What happens on `build`, `watch` and `dist`

#### Copy and search-replace

All subdirectories and their php files are copied into the corresponding destination directory. E.g.: `./src/inc/fun/*.php` will be copied to `./test_build/inc/fun`.
Rename ???

#### Creates kind of autoloader function

Kind of autoloader file will be created for each subdirectory. The file contains a function that includes all files together. For example `./test_build/inc/prefix_include_fun.php`. Each autoloader file contains a function equally named to the file base name.

The project base class has a method `_include( $subdirectory )` that checks for existents of necessary files and runs the include function. It automatically includes some subdirectories. Depending on project-type:

| subdirectory       	| hooked in plugin                          	| hooked in theme   	|
|--------------------	|-------------------------------------------	|-------------------	|
| fun                	| plugins_loaded                            	| plugins_loaded    	|
| post_types_taxs    	|  on plugin activation hook plugins_loaded 	| directly included 	|
| roles_capabilities 	| on plugin activation hook                 	| directly included 	|
| template_functions 	| not included                              	| plugins_loaded    	|
| template_tags      	| not included                              	| plugins_loaded    	|

More subdirectories can be added manually. The include function must be called manually as well in that case.
You could do one of the following.

Add a file `./src/inc/fun/prefix_include_inc_custom.php`:
```php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function prefix_include_inc_custom() {
	prefix\Prefix::get_instance()->_include( 'custom' );
}
add_action( 'plugins_loaded', 'prefix_include_inc_custom' );
```

Extend the project base class `auto_include` method:
```php
public function auto_include() {
	parent::auto_include();
	$this->_include( 'custom' );
}
```

Add a method to the project base class and extend the `hooks` method:
```php
public function hooks(){
	parent::hooks();
	add_action( 'plugins_loaded', array( $this, 'include_inc_custom' ), 10 );
}

public function include_inc_custom(){
	$this->_include( 'custom' );
}
```