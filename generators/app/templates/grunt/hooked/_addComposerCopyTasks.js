const path = require('path');
const addComposerCopyTask = require('../addComposerCopyTask');

const addComposerCopyTasks = grunt => {

	let packages = grunt.file.readJSON( path.resolve( 'grunt/copyComposerPackages.json' ) );
	packages = packages ? packages.packages : packages;

	if ( ! packages.length )
		return;

	[...packages].map( name => addComposerCopyTask( grunt, { name } ) );
}

module.exports = addComposerCopyTasks;
