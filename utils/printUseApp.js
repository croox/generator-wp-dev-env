const chalk = require('chalk');

const printUseApp = self => {
	if ( ! self.options.calledBy ) {
		self.log( '' );
		self.log( chalk.yellow( 'Sorry, please don\'t use this subgenerator directly!' ) );
		self.log( chalk.yellow( 'Use' ) + ' yo wp-dev-env ' + chalk.yellow( 'instead.' ) );
		self.log( '' );
	}
}
module.exports = printUseApp;
