
const chalk = require('chalk');

/**
 * Run Functions or spawn commands synchronously
 *
 * @param array	precesses	Collection. see ???
 * @param object	self	Instance of generator
 * @return promise
 */
const chainCommandsAndFunctions = ( precesses, self ) => {

	return [...precesses].reduce( ( accumulatorPromise, process ) => {

		return accumulatorPromise.then( () => {
			return new Promise( ( resolve, reject ) => {

				switch( true ) {

					case undefined !== process.func && undefined !== process.args:
						process.func.apply( null, process.args ).then( res => resolve( res ) )
						break;

					case undefined !== process.cmd && undefined !== process.args:
						self.log('');
						self.log('');
						self.log( chalk.green( 'Start childprocess: ' ) + chalk.yellow( process.cmd + ' ' + process.args.join( ' ' ) ) );
						self.log('');
						self.spawnCommand( process.cmd, process.args )
						.on( 'close', code => {
							self.log('');
							self.log( 0 === code
								? chalk.green( 'Childprocess done with exit code: ' ) + code
								: chalk.red( 'Childprocess exited with code: ' ) + code
								);
							self.log( 'Command was: ' + chalk.italic( process.cmd + ' ' + process.args.join( ' ' ) ) );
							self.log('');
							resolve( code );
						} );
						break;

				}

			} );
		} ).catch( err => console.log( err ) );

	}, Promise.resolve() );

};

module.exports = chainCommandsAndFunctions;
