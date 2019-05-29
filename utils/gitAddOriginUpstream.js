const chalk = require('chalk');
const { prompt } = require('enquirer');
const simpleGit = require('simple-git')();
const logAndExit = require('./logAndExit');

const gitAddOriginUpstream = ( generator ) => {

	return new Promise( ( resolve, reject ) => {

		const { repositoryUri } = generator.tplContext;

		const initial = repositoryUri.startsWith( 'https://github.com/' )
			? repositoryUri.replace( 'https://github.com/', 'git@github.com:' ) + '.git'
			: '';

		generator.log( '' );
		generator.log(
			'(recommended)'
			+ ' ' + chalk.yellow.bold( 'Add a remote origin and set upstream for main branches' )
		);
		generator.log( 'Keep in mind, that the remote has to be created before you proceed!' );

		prompt( [ {
			type: 'input',
			name: 'origin',
			message: chalk.yellow( 'Remote origin' ),
			initial: initial,
		} ] ).then( answers => {

			const origin = answers.origin.trim();

			if ( origin.length > 0 ) {
				simpleGit.addRemote( 'origin', origin )
				.checkout( 'master' ).push( ['-u', 'origin', 'master'] )
				.checkout( 'generated' ).push( ['-u', 'origin', 'generated'] )
				.checkout( 'develop' ).push( ['-u', 'origin', 'develop'] )
				.exec( () => resolve() );
			} else {
				resolve();
			}
		} ).catch( e => logAndExit( generator, e ) );

	} );

};

module.exports = gitAddOriginUpstream;