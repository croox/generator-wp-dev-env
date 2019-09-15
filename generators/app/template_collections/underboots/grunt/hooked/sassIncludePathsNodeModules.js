
const path = require( 'path' )
const {
	get,
	set,
	union,
} = require( 'lodash' );

const sassIncludePathsNodeModules = grunt => {

	// add node_modules to sass path. if using npm bootstrap, makes bootstrap available
	grunt.hooks.addFilter( 'config.sass', '<%= funcPrefix %>.config.sass.node_modules', config => {
		const newConfig = { ...config, };
		set( newConfig, ['options','includePaths'], union(
			get( newConfig, ['options','includePaths'], [] ),
			[path.resolve( 'node_modules' )]
		) );
		return newConfig;
	}, 10 );

};

module.exports = sassIncludePathsNodeModules;