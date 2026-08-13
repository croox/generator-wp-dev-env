'use strict';
const chalk = require('chalk');
const fs = require('fs');

function mkDir(self, dir, options) {
	const log = options.log ? options.log : console.log;

	try {
		// Dir exists
		fs.statSync(dir).isDirectory();
	} catch {
		// Dir does not exist
		const msgDir = self ? dir.replace(self.destinationPath() + '/', '') : dir;
		log(chalk.green('   create ') + msgDir + '/');
		fs.mkdirSync(dir);
	}
}

module.exports = mkDir;
