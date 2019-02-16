const glob = require('glob');
const path = require('path');


const copyTemplatesBulk = ( self, source, destination, data, options ) => {
	options = {
		prependFunctionPrefix: true,
		...options,
	};

	const { funcPrefix } = self.props;

	const files = glob.sync( !('*~'|'*#') , { dot: true, cwd: source } );

	[...files].map( file => {

		const fileName = path.basename(file);
		if ( 0 === fileName.indexOf('_') ){

			const srcPath = path.join( source, file );
			const destPath = path.join(
				destination,
				path.dirname(file),
				options.prependFunctionPrefix === true
					? fileName.startsWith( '_class-' )
					? fileName.replace( /^_class-/, 'class-' + funcPrefix + '_' )
					: fileName.replace( /^_/, funcPrefix + '_' )
					: fileName.replace( /^_/, '' )
			);

			this.fs.copyTpl( srcPath, destPath, data);
		}

	} );
}

module.exports = copyTemplatesBulk;