// Idea from here: https://stackoverflow.com/questions/43431829/split-array-of-file-paths-into-hierarchical-object-in-javascript/43432913

// Build tree recursively
function buildTree(paths, path) {
	path = path || '';

	// Extract a filename from a path
	function getFilename(path) {
		return path
			.split('/')
			.filter((value) => value && value.length)
			.reverse()[0];
	}

	// Find sub paths
	function findSubPaths(path) {
		// Slashes need to be escaped when part of a regexp
		const rePath = path.replace('/', '\\/');
		const re = new RegExp('^' + rePath + '[^\\/]*\\/?$');
		return paths.filter((i) => i !== path && re.test(i));
	}

	const nodeList = [];
	const subPaths = findSubPaths(path);
	[...subPaths].forEach((subPath) => {
		const nodeName = getFilename(subPath);
		if (/\/$/.test(subPath)) {
			const node = {};
			node[nodeName] = buildTree(paths, subPath);
			nodeList.push(node);
		} else {
			nodeList.push(nodeName);
		}
	});
	return nodeList;
}

module.exports = buildTree;
