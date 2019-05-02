const glob = require('fast-glob');
const path = require('path');


const copyTemplatesBulk = ( self, source, destination, tplContext, options ) => {
	options = {
		globPattern: '**/*',	/// ??? test this, should be an array actually!!!
		prependFunctionPrefix: true,
		...options,
	};
	options.globPattern = [
		...options.globPattern,
		'!**/*~',
		'!**/*#',
	];

	const { funcPrefix } = tplContext;

	const files = glob.sync( [ ...options.globPattern ] , { dot: true, cwd: source } );

	[...files].map( file => {

		let fileName = path.basename( file );
		let fileExt = path.extname( file );

		if ( 0 === fileName.indexOf('_') && options.prependFunctionPrefix && '.scss' !== fileExt ){
			fileName = fileName.replace( /^_class-/, 'class-' + funcPrefix + '_' );
			fileName = fileName.replace( /^_/, funcPrefix + '_' );
		}

		const srcPath = path.join( source, file );

		const destPath = path.join(
			destination,
			path.dirname( file ),
			fileName
		);

		self.fs.copyTpl(
			srcPath,
			destPath,
			tplContext
		);

	} );
}

module.exports = copyTemplatesBulk;