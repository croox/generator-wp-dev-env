'use strict';
const chalk = require( 'chalk' );
const fs = require( 'fs' );

module.exports = function mkDir( self, dir, options ) {
	const log = options.log ? options.log : console.log;

	try {
		// dir exists
		fs.statSync(dir).isDirectory();
	}
	catch (err) {
		// dir does not exist
		const msgDir = self ? dir.replace( self.destinationPath() + '/', '' ) : dir;
		log( chalk.green( '   create ' ) + msgDir + '/' );
		fs.mkdirSync( dir );
	}
};