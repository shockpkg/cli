/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * Available command.
 */
export class Available extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'List the available packages not installed.';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {
		help: Flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		await this.parse(Available);

		await this._manager(async m => {
			const installed = await m.installed();
			const installedSet = new Set(installed);

			for (const pkg of m.packageItter()) {
				if (!installedSet.has(pkg)) {
					this.log(pkg.name);
				}
			}
		});
	}
}
export default Available;
