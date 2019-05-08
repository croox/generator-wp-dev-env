const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const compressing = require('compressing');
const DocBlock = require('docblock');
const {
	get,
	uniq,
	dropWhile,
	mapValues,
} = require('lodash');

const pkg = require( path.resolve( 'package.json' ) );
const md2html = require( './utils/md2html' );
const html2docset = require( './utils/html2docset' );
const buildTree = require( './utils/buildTree' );

// copies all readme.md from templates to tmp
const copyReadmesDirectory = () => {
	const sourceDir = path.resolve( 'generators', 'app', 'templates' )

	const files = glob.sync( [
		'**/readme.md',
		'!**/*~',
		'!**/*#',
	] ,{
		cwd: sourceDir,
	} );


	[...files].map( file => {
		const newFileName = file.replace(  /\/readme/g, '' ).replace( /\//g, '___' );
		fs.copySync(
			path.resolve( sourceDir, file ),
			path.resolve( 'tmp', 'docs', 'types', 'Section', newFileName )
		);
	} );
}

// copies all readme.md from docs/src/types to tmp
const copyReadmesDocsSrc = () => {
	const sourceDir = path.resolve( 'docs', 'src', 'types' )

	const files = glob.sync( [
		'**/*.md',
		'!**/*~',
		'!**/*#',
	] ,{
		cwd: sourceDir,
	} );

	[...files].map( file => {
		fs.copySync(
			path.resolve( sourceDir, file ),
			path.resolve( 'tmp', 'docs', 'types', file )
		);
	} );
}

const getDirTree = () => {
	const sourceDir = path.resolve( 'generators', 'app', 'templates' )

	const files = uniq( [
		'root/',
		...( glob.sync( [
			'**/readme.md',
			'!**/*~',
			'!**/*#',
		] ,{
			cwd: sourceDir,
		} ).map( file => file.replace( 'readme.md', '' ) ).map( file => 'root/' + file ) ),
	] );

	let text = '\n';

	const loopTree = ( tree, i, lasts ) => {
		const loopNode = ( node ) => {

			Object.entries( node ).forEach( entry => {
				const [key, value] = entry;

				const fileName = [
					...dropWhile( lasts, n => 'root' === n ),
					key,
				].join( '___' )


				const link = 'root' === key
					? 'root'
					: '[' + key + '](../Section/' + fileName + '.html)';

				text += ( i > 0 ? '--'.repeat( i ) + ' ' : '' ) + link + '\n'

				loopTree( value, i + 1, [...lasts, key] );
			} );
		}

		[...tree].map( node => loopNode( node ) );
	};

	loopTree( buildTree( files ), 0, [] );

	return text;
}

const getTaskList = () => {
	const sourceDir = path.resolve( 'docs', 'src', 'types', 'Command' )

	const files = glob.sync( [
		'**/*.md',
		'!**/*~',
		'!**/*#',
	] ,{
		cwd: sourceDir,
	} );

	let text = '\n';

	[...files].map( file => {
		const taskName = file.replace( '.md', '' );
		const taskDesc = fs.readFileSync( path.resolve( sourceDir, file ), { encoding: 'utf8' } ).match( /(>[\s][\s\S]*?\n)([\S][\s\S]*?\n)*/ );
		text += '- [' + taskName + '](../Command/' + taskName + '.html)',
		text += taskDesc ? '\n' + taskDesc[0].replace( '> ', '' ) + '\n' : '';
		text += '\n'
	} );

	return text;
}

const getHookList = functionName => {
	const sourceDir = path.resolve( '..', 'wp-dev-env-grunt', 'grunt' );

	const files = glob.sync( [
		'**/*.js',
		'!**/*~',
		'!**/*#',
	] ,{
		cwd: sourceDir,
	} );

	let text = '\n';

	if ( files.length === 0 ) {
		console.log( 'No files found!' );
		console.log( '"wp-dev-env-grunt" needs to be in same directory like "generator-wp-dev-env"' );
	}

	[...files].map( file => {

		// find hook function and optional above docblock
		const functionRegex = new RegExp(
			'(\\/\\*\\*[\\r\\n](.|[\\r\\n])*?\\*\\/)?[\\r\\n].*(' +
			functionName +
			'\\()[\\s\\S]*?' +
			( 'applyFilters' === functionName ? ',' : '' ) +
			( 'doAction' === functionName ? '\\)' : '' ) +
			'',
		'g' );
		const matches = fs.readFileSync( path.resolve( sourceDir, file ), { encoding: 'utf8' } ).match( functionRegex );

		if ( matches ) {
			[...matches].map( match => {

				// parse docblock or just store the entire match
				let doc = null;
				if ( match.startsWith( '/**' ) ) {
					const docBlock = new DocBlock( {
						skipMarkdown: true,
					} );
					const parsed = docBlock.parse( match, 'js' );
					doc = parsed ? parsed[0] : null;
				} else {
					doc = {
						code: match,
					};
				}

				if ( doc ) {

					let key = '';
					switch( functionName ) {
						case 'applyFilters':
							key = doc['code'].match( /(applyFilters\()[\s\S]*?,/g )[0].replace( /(applyFilters\()[\s]*['"]/, '' ).replace( /['"],/, '' );
							break;
						case 'doAction':
							key = doc['code'].replace( /[\s\S]*grunt\.hooks\.doAction.*?['"]/, '' ).replace( /['"][\s\S]*/, '' );
							break;
					}

					// start
					text += '- **' + key + '**';

					// description
					if ( get( doc, ['description'], false ) ) {
						text += '\n' + doc['description'].replace( '\n', '' );
					}

					// filepath
					text += '\n*File:* ' + path.join( 'wp-dev-env-grunt', 'grunt', file );

					// params
					const params = get( doc, ['tags','params'], false );
					if ( params ) {
						text += '\n*Params:* ' + '\n';
						[...params].map( param => {
							text += '\n  - *' + param.type + '*\t' + param.name + '\t' + param.description + '\n';
						} );
					}

					// end
					text += '\n'
				}

			} );
		}

	} );

	return text;
}

const replacePatterns = ( typesDir ) => {

	const files = glob.sync( [
		'**/*.md',
		'!**/*~',
		'!**/*#',
	] ,{
		cwd: typesDir,
	} );

	const options = {
		files:[...files].map( file => path.resolve( typesDir, file ) ),
		from: [],
		to: [],
	};

	[
		{
			from: /@include::project_structure_tree/g,
			to: ( match ) => getDirTree(),
		},
		{
			from: /@include::task_list/g,
			to: ( match ) => getTaskList(),
		},
		{
			from: /@include::filter_list/g,
			to: ( match ) => getHookList( 'applyFilters' ),
		},
		{
			from: /@include::action_list/g,
			to: ( match ) => getHookList( 'doAction' ),
		},

	].map( repl => {
		options.from.push( repl.from );
		options.to.push( repl.to );
	} );

	try {
		const results = replace.sync( options );
	}
	catch (error) {
		console.error('Error occurred:', error );
	}

};

const compressDocset = () => {

	return new Promise( ( resolve, reject ) => {

		const promises = [
			'tar',
			'tgz',
			'zip',
		].map( method => {
			return new Promise( ( resolve, reject ) => {
				compressing[method]['compressDir'](
					path.resolve( 'docs', pkg.name + '.docset' ),
					path.resolve( 'docs', pkg.name + '.docset.' + method ),
				).then( res => resolve( res ) ).catch( err => console.log( err ) );
			} ).catch( err => reject( err ) );
		} );

		Promise.all( promises ).then( res => resolve( res ) );
	} );
};

const buildDocs = () => {

	// ensure empty tmp and docset dirs
	[
		path.resolve( 'tmp', 'docs' ),
		path.resolve( 'docs', pkg.name + '.docset' ),
	].map( dir => {
		fs.emptyDirSync( dir );
		fs.ensureDirSync( dir )
	} );

	// get all markdown into tmp/docs/types
	copyReadmesDirectory();
	copyReadmesDocsSrc();

	const typesDir = path.resolve( 'tmp', 'docs', 'types' );
	const htmlDir = path.resolve( 'tmp', 'docs', 'html' );

	replacePatterns( typesDir );

	md2html( typesDir, htmlDir );

	html2docset( typesDir, htmlDir ).then( res => {

		compressDocset().then( res => {

			fs.removeSync( path.resolve( 'tmp', 'docs' ) );

			console.log( '' );
			console.log( chalk.green( 'Created docs, see: ' ) );
			console.log( path.resolve( 'docs', pkg.name + '.docset' ) );
			console.log( path.resolve( 'docs', pkg.name + '.docset.tar' ) );
			console.log( path.resolve( 'docs', pkg.name + '.docset.tgz' ) );
			console.log( path.resolve( 'docs', pkg.name + '.docset.zip' ) );

		} );

	} );

};

buildDocs();
