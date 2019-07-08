const glob = require('fast-glob');
const fs = require('fs');

const logAndExit = require('./logAndExit');


const cleanDestination = generator => {
	return new Promise( ( resolve, reject ) => {

		generator.log( '' );
		generator.log( 'Cleanup project' );
		generator.log( '' );

		const files = glob.sync( [
			'grunt/**/*',
			'src/**/*',
			'dist/**/*',
			'test_build/**/*',
			'Gruntfile.js',
			'README.md',
			'.wde_nextRelease.json',
			'.eslintrc.json',
			'composer.json',
			'package.json',
			'wde_wp_installs-sample.json',
			'releases/readme.md',
			'vendor/readme.md',
		], { dot: true, cwd: generator.destinationPath() } );

		Promise.all( [...files].map( file => {
			return new Promise( ( resolve, reject ) => {
				fs.unlink( file, err => {
					if (err) reject( err );
					generator.log( '   Deleted file: ' + file );
					resolve();
				} );
			} );
		} ) ).then( () => {
			generator.log( '' );
			resolve();
		});

	} ).catch( e => logAndExit( this, e ) );
};


module.exports = cleanDestination;