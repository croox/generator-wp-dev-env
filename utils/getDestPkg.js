const getDestPkg = (generator) => {
	let pkg = null;
	try {
		pkg = require(generator.destinationPath('package.json'));
	} catch {
		// Intentionally swallow. Return null.
	}

	return pkg;
};

module.exports = getDestPkg;
