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
	public static description = 'list the installed packages';

	/**
	 * Examples.
	 */
	public static examples = [];

	/**
	 * Flags.
	 */
	public static flags = {
		help: flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	public static args = [];

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Installed);

		const installed = await this._manager(async m => m.installed());

		for (const pkg of installed) {
			this.log(pkg.name);
		}
	}
}
