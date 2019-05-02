
// idea from here: https://stackoverflow.com/questions/43431829/split-array-of-file-paths-into-hierarchical-object-in-javascript/43432913


// Build tree recursively
function buildTree( paths, path ) {
    path = path || "";

    // Extract a filename from a path
    function getFilename(path) {
    	return path.split("/").filter(function(value) {
    			return value && value.length;
    	}).reverse()[0];
    }

    // Find sub paths
    function findSubPaths(path) {
    	// slashes need to be escaped when part of a regexp
    	var rePath = path.replace("/", "\\/");
    	var re = new RegExp("^" + rePath + "[^\\/]*\\/?$");
    	return paths.filter(function(i) {
			return i !== path && re.test(i);
    	});
    }

    var nodeList = [];
    const subPaths = findSubPaths(path);
    [...subPaths].map( subPath => {
        var nodeName = getFilename(subPath);
        if (/\/$/.test(subPath)) {
            var node = {};
            node[nodeName] = buildTree( paths, subPath );
            nodeList.push(node);
        } else {
            nodeList.push(nodeName);
        }
    });
    return nodeList;
}

module.exports = buildTree;