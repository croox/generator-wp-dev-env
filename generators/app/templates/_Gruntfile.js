'use strict';

const {
	startGrunt,
	createHooks,
} = require( 'wp-dev-env-grunt' );

module.exports = grunt => {
	createHooks( grunt );
	startGrunt( grunt );
};