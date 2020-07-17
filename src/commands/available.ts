/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Obsolete command.
 */
export default class Obsolete extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = (
		'list the available packages not installed'
	);

	/**
	 * Examples.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly flags = {
		help: flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Obsolete);

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
