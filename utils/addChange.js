
const {
	isString,
} = require('lodash');

const fs = require('fs');
const chalk = require('chalk');
const logAndExit = require('./logAndExit');

const addChange = ( generator, type, message ) => {

	const fileName = generator.destinationPath( '.wde_nextRelease.json' );

	let nextRelease;
	try {
		nextRelease = generator.fs.readJSON( fileName );
	}
	catch( err ) {
		generator.log( '' );
		generator.log( chalk.red.bold( 'Can\'t read/parse ' + fileName ) );
		logAndExit( generator, err )
	}

	const newNextRelease = {
		...nextRelease,
		changes: [
			...nextRelease.changes,
			...( isString( type ) && isString( message ) ? [{
				type: type,
				message: message,
			}] : [] ),
		],
	};

	fs.writeFile(
		fileName,
		JSON.stringify( newNextRelease, null, 2 ),
		{ encoding: 'utf8' },
		err => {
			if (err) throw err;
			generator.log( chalk.green( 'Added Change' ) + ' updated ' + fileName );
		}
	);
};

module.exports = addChange;