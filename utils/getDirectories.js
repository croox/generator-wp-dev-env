
const { join } = require( 'path' );
const { lstatSync, readdirSync } = require( 'fs' );

const getDirectories = source => readdirSync( source )
	.map( name => join( source, name ) )
	.filter( source => lstatSync( source ).isDirectory() );

module.exports = getDirectories;