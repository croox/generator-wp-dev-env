
const getDestPkg = generator => {

	let pkg = null;
	try {
		pkg = require( generator.destinationPath( 'package.json' ) );
	}
	catch (e) {
		// console.log(e);
	}
	return pkg;
}


module.exports = getDestPkg;
