

const {
	get,
	isArray,
} = require('lodash');
const path = require('path');

const mkDir = require('./mkDir');
const getDirectories = require('./getDirectories');

const copyDirStructure = ( self, root, options ) => {
	root = root ? root : path.resolve( self.templatePath() )
	const dirs = getDirectories( root );
	[...dirs].map( dir => {

		if ( isArray( get( options, ['exclude'], false ) ) ) {
			if ( options.exclude.includes( dir.replace( self.templatePath() + '/', '' ) ) )
				return;
		}

		mkDir( self, dir.replace( self.templatePath(), self.destinationPath() ), { log: self.log } );
		copyDirStructure( self, dir, options );
	} );
}

module.exports = copyDirStructure;
