const chalk = require('chalk');
const figlet = require('figlet');
const im = require('imagemagick');

const createScreenshot = ( generator, inputText ) => {

	// ??? requires ImageMagick, does it break all if no ImageMagick?

	const content = 'text 0,0 "' + figlet.textSync( inputText, {
		font: 'Ogre',
		horizontalLayout: 'fitted',
		verticalLayout: 'fitted'
	} ) + '"';

	const dest = generator.destinationPath( 'src/screenshot.png' );

	const size = '1200x900';
	const margin = 10;	// %
	const sizeWithMargin = () => size.split('x').map( pxs => pxs - ( ( margin / 100 ) * pxs ) ).join('x');

	const screenshotPromise = [
		{
			// create huge wide image with big letters
			cmd: 'convert',
			args: [
				'-size','3500x800',
				'xc:white',
				'-font','FreeMono',
				'-pointsize','110',
				'-fill','black',
				'-gravity','center',
				'-draw',content,
				dest,
			],
		},
		{
			// crop img to content and resize to smaller than final size
			cmd: 'convert',
			args: [
				dest,
				'-trim',
				'+repage',
				'-resize',sizeWithMargin() + '>',
				'-gravity','center',
				'-background','white',
				'-extent',sizeWithMargin(),
				dest,
			],
		},
		{
			// resize image canvas to final size, center content
			cmd: 'convert',
			args: [
				dest,
				'-resize',size + '>',
				'-gravity','center',
				'-background','white',
				'-extent',size,
				dest,
			],
		},
	].reduce( ( accumulatorPromise, process ) => {
		return accumulatorPromise.then( () => {
			return new Promise( ( resolve, reject ) => {
				im[process.cmd]( process.args, ( err, stdout ) => {
					if ( err )
						reject( err );
					resolve( stdout );
				} );
			} );
		} ).catch( err => console.log( err ) );
	}, Promise.resolve() );

	return new Promise( ( resolve, reject ) => {
		screenshotPromise.then( result => {
			generator.log('');
			generator.log( chalk.green( 'Successfully created screenshot' ) );
			generator.log('');
			resolve();
		} ).catch( err => {
			generator.log('');
			generator.log( chalk.red( 'Couldn\'t create screenshot' ) );
			generator.log( chalk.red( 'Is ImageMagick installed?' ) );
			generator.log( err );
			generator.log('');
			resolve();
		} );
	} );

};

module.exports = createScreenshot;