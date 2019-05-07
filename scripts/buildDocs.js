const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const compressing = require('compressing');
const {
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
			path.resolve( 'tmp', 'docs', 'types', 'Directory', newFileName )
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

				const link = '[' + key + '](../Directory/' + fileName + '.html)';
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
	const sourceDir = path.resolve( 'docs', 'src', 'types', 'Task' )

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
		text += '- [' + taskName + '](../Task/' + taskName + '.html)',
		text += taskDesc ? '\n' + taskDesc[0].replace( '> ', '' ) + '\n' : '';
		text += '\n'
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
