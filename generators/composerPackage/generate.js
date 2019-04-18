const chalk = require('chalk');
const {
	get,
	set,
	union,
	find,
	has,
} = require('lodash');

const copyDirStructure = require('../../utils/copyDirStructure');
const copyTemplatesBulk = require('../../utils/copyTemplatesBulk');
const getPackageConfigs = require('./getPackageConfigs');

const generate = self => {

	const { tplContext } = self.options;

	const updateComposerJson = ( composerPkg, packageConfig ) => {

		// get composer.json
		let composerJson = self.fs.readJSON( self.destinationPath( 'composer.json' ) );
		let newComposerJson = { ...composerJson };

		// maybe set installer-paths
		if ( get( packageConfig, ['installPath'] ) ) {
			set( newComposerJson, ['extra','installer-paths', packageConfig.installPath ], union(
				get( newComposerJson, ['extra','installer-paths', packageConfig.installPath ], [] ),
				[composerPkg]
			) );
		}

		// maybe set repository
		if ( get( packageConfig, ['repository'] ) ) {
			let newRepositories = [ ...get( newComposerJson, ['repositories'], [] ) ];
			if ( has( packageConfig, ['repository','url'] ) && undefined === find( newRepositories, { 'url': packageConfig.repository.url } ) ) {
				newRepositories = [
					...newRepositories,
					packageConfig.repository,
				];
				set( newComposerJson, ['repositories'], newRepositories );
			}
		}

		// write new composer.json
		self.fs.writeJSON(
			self.destinationPath( 'composer.json' ),
			newComposerJson
		);
	};

	const copyTpls = tpls => [...tpls].map( tpl => self.fs.copyTpl(
		self.templatePath( tpl.src ),
		self.destinationPath( tpl.dest ),
		tplContext
	) );

	const packageConfigs = getPackageConfigs( tplContext );

	[...tplContext.composerPkgs].map( composerPkg => {
		const packageConfig = find( packageConfigs, { 'key': composerPkg } );
		updateComposerJson( composerPkg, packageConfig );
		if ( get( packageConfig, ['templates'] ) )
			copyTpls( packageConfig.templates );
	} );

};

module.exports = generate;
