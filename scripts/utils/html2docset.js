const fs = require('fs-extra');
const path = require('path');

const DocSetGenerator = require('docset-generator').DocSetGenerator;

const pkg = require( path.resolve( 'package.json' ) );

const extReg = /([.]md)|([.]markdown)/;

const html2docset = ( typesDir, htmlDir ) => {

	return new Promise( resolve => {

		// directories must be types: https://kapeli.com/docsets#supportedentrytypes
		const types = fs.readdirSync( typesDir );

		const entries = [];

		[...types].map( type => {
			const mds = fs.readdirSync( path.join( typesDir, type ) );

			[...mds].map( md => {
				const name = md.replace( extReg, '' );
				entries.push( {
					name: name,
					type: type,
					path: path.join( type, name + '.html' )
				} );
			} );

		} );

		// create docset use
		const docSetGenerator = new DocSetGenerator( {
			destination: path.resolve( 'docs' ),
			name: pkg.name,
			documentation: htmlDir,
			entries: entries,
		} );
		docSetGenerator.create().then( res => resolve( res ) );

	} );

};

module.exports = html2docset;




