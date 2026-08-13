const chalk = require('chalk');

/**
 * Run Functions or spawn commands synchronously
 *
 * @param array	precesses	Collection. see ???
 * @param object	self	Instance of generator
 * @return promise
 */
const chainCommandsAndFunctions = (precesses, self) =>
	[...precesses].reduce(
		(accumulatorPromise, process) =>
			accumulatorPromise
				.then(
					() =>
						new Promise((resolve) => {
							switch (true) {
								case undefined !== process.func && undefined !== process.args:
									process.func
										.apply(null, process.args)
										.then((res) => resolve(res));
									break;

								case undefined !== process.cmd && undefined !== process.args:
									self.log('');
									self.log('');
									self.log(
										chalk.green('Childprocess: ') +
											chalk.yellow(process.cmd + ' ' + process.args.join(' '))
									);
									self.spawnCommand(process.cmd, process.args).on(
										'close',
										(code) => {
											if (code !== 0)
												self.log(
													chalk.red('Childprocess exited with code: ') +
														code
												);

											if (self.options.verbose || code !== 0)
												self.log(
													'Command was: ' +
														chalk.italic(
															process.cmd +
																' ' +
																process.args.join(' ')
														)
												);

											self.log('');
											resolve(code);
										}
									);
									break;

								default:
									break;
							}
						})
				)
				.catch((err) => console.log(err)),
		Promise.resolve()
	);

module.exports = chainCommandsAndFunctions;
