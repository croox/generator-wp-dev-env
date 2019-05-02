const fs = require('fs-extra');
const path = require('path');
const showdown = require('showdown');
const showdownHighlight = require('showdown-highlight');

const pkg = require( path.resolve( 'package.json' ) );

const extReg = /([.]md)|([.]markdown)/;

const md2html = ( typesDir, htmlDir ) => {

	// directories must be types: https://kapeli.com/docsets#supportedentrytypes
	const types = fs.readdirSync( typesDir );

	fs.ensureDirSync( htmlDir );

	// init converter, showdown flavor github
	showdown.setFlavor( 'github' );
	let converter = new showdown.Converter( {
		extensions: [showdownHighlight]
	} );

	[...types].map( type => {

		let markdowns = fs.readdirSync( path.join( typesDir, type ) );
		[...markdowns].map( md => {

			const ext = path.extname( md );
			if ( ext !== '.md' && ext !== '.markdown')
				return;

			// read markdown file
			const mdData = fs.readFileSync( path.join( typesDir, type, md ), {
				encoding: 'utf8',
			} );
			// convert to html
			let mdHtml = converter.makeHtml( mdData );

			// set paths
			let typePath = path.join( htmlDir, type );
			let htmlPath = path.join( typePath, md.replace( extReg, '' ) + '.html' );
			fs.ensureDirSync( typePath );

			// define template
			let template = '{{text}}';
			switch( type ) {
				case 'Directory':
					template = require( path.resolve( 'docs', 'src', 'templates', 'directory.html' ) );
					break;
				case 'Guide':
				default:
					template = require( path.resolve( 'docs', 'src', 'templates', 'default.html' ) );
			}

			// write to temp HTML file
			fs.writeFileSync( htmlPath, template.replace( '{{text}}', mdHtml ) );

		} );

	} );

};

module.exports = md2html;
