const path = require('path');
const chalk = require('chalk');

const logAndExit = ( generator, str ) => {
	generator.log( str ? chalk.red.bold( str ) : '' );
	process.exit();
};

module.exports = logAndExit;