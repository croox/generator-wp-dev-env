
const addComposerCopyTask = ( grunt, props ) => {

	props = props ? props : {};
	const {
		src,
		name,
	} = props;

	const taskName = 'vendor_' + [...name.split('/')].join( '_' );
	const path = ['vendor',...name.split('/')].join( '/' );

	// Add task to config copy
	grunt.hooks.addFilter( 'config.copy', 'config.copy.' + taskName, config => {
		const newConfig = {
			...config,
			[taskName]: {
				expand: true,
				cwd: path,
				src: src ? src : ['**/*'],
				dest: grunt.option( 'destination' ) + '/' + path,
			},
		};
		return newConfig;
	}, 10 );

	// Run task on priority 20
	grunt.hooks.addFilter( 'tasks.build.tasks', 'tasks.build.tasks.' + taskName, tasks => {
		const newTasks = [
			...tasks,
			'copy:' + taskName,
		];
		return newTasks;
	}, 20 );
}

module.exports = addComposerCopyTask;
