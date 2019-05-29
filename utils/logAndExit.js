const glob = require('fast-glob');
const path = require('path');
const chalk = require('chalk');

const logAndExit = ( generator, str ) => {
	generator.log( chalk.red.bold( str ) );
	process.exit();
};

module.exports = logAndExit;