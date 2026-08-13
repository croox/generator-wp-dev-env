const { get, set, union, find, has, uniq } = require('lodash');

const getPackageConfigs = require('./getPackageConfigs');

const generate = (self) => {
	const { tplContext } = self.options;

	const updateComposerJson = (composerPkg, packageConfig) => {
		// Get composer.json
		const composerJson = self.fs.readJSON(self.destinationPath('composer.json'));
		const newComposerJson = { ...composerJson };

		// Maybe set installer-paths
		if (get(packageConfig, ['installPath'])) {
			set(
				newComposerJson,
				['extra', 'installer-paths', packageConfig.installPath],
				union(
					get(
						newComposerJson,
						['extra', 'installer-paths', packageConfig.installPath],
						[]
					),
					[composerPkg]
				)
			);
		}

		// Maybe set repository
		if (get(packageConfig, ['repository'])) {
			let newRepositories = [...get(newComposerJson, ['repositories'], [])];
			switch (get(packageConfig, ['repository', 'type'])) {
				case 'vcs':
					// Check if already existing, and add packageConfig.repository
					if (
						has(packageConfig, ['repository', 'url']) &&
						undefined === find(newRepositories, { url: packageConfig.repository.url })
					) {
						newRepositories = [...newRepositories, packageConfig.repository];
						set(newComposerJson, ['repositories'], newRepositories);
					}

					break;
				case 'package':
					if (
						undefined ===
						newRepositories.find(
							(repo) =>
								repo.type === 'package' &&
								get(packageConfig.repository, ['package', 'name']) ===
									get(repo, ['package', 'name'])
						)
					) {
						newRepositories = [...newRepositories, packageConfig.repository];
						set(newComposerJson, ['repositories'], newRepositories);
					}

					break;
				default:
					// Add packageConfig.repository
					newRepositories = [...newRepositories, packageConfig.repository];
					set(newComposerJson, ['repositories'], newRepositories);
			}
		}

		// Maybe set autoload
		if (get(packageConfig, ['autoload'], false) !== false) {
			set(
				newComposerJson,
				['autoload', 'psr-4', packageConfig.autoload],
				union(get(newComposerJson, ['autoload', 'psr-4', packageConfig.autoload], []), [
					'vendor/' + packageConfig.key + '/',
				])
			);
		}

		// Write new composer.json
		self.fs.writeJSON(self.destinationPath('composer.json'), newComposerJson);
	};

	const updateCopyComposerPackagesJson = (composerPkg, packageConfig) => {
		// Get file
		const filePath = self.destinationPath('grunt/copyComposerPackages.json');
		const copyComposerPackagesJson = self.fs.readJSON(filePath);

		// Add packages
		const newCopyComposerPackagesJson = {
			...(copyComposerPackagesJson && copyComposerPackagesJson),
			packages: uniq([
				...(copyComposerPackagesJson && copyComposerPackagesJson.packages
					? copyComposerPackagesJson.packages
					: []),
				packageConfig.key,
			]),
		};

		// Write new file
		self.fs.writeJSON(filePath, newCopyComposerPackagesJson);
	};

	const copyTpls = (tpls) =>
		[...tpls].map((tpl) =>
			self.fs.copyTpl(self.templatePath(tpl.src), self.destinationPath(tpl.dest), tplContext)
		);

	const packageConfigs = getPackageConfigs(tplContext);

	[...tplContext.composerPkgs].forEach((composerPkg) => {
		const packageConfig = find(packageConfigs, { key: composerPkg });
		updateComposerJson(composerPkg, packageConfig);
		updateCopyComposerPackagesJson(composerPkg, packageConfig);
		if (get(packageConfig, ['templates'])) copyTpls(packageConfig.templates);
	});

	// Return a promise.
	// But can't find a way to wait for mem-fs-editor to be done.
	// So the promise resolves directly. And whatever calls this function
	// has to handle it somehow and wait that all is done.
	return new Promise((resolve) => {
		resolve();
	});
};

module.exports = generate;
