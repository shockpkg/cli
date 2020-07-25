/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Installed command.
 */
export default class Installed extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'list the installed packages';

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
		this.parse(Installed);

		const installed = await this._manager(async m => m.installed());

		for (const pkg of installed) {
			this.log(pkg.name);
		}
	}
}
