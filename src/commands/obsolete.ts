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
	public static description = 'list the obsolete packages';

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
		const {args, flags, argv} = this.parse(Obsolete);

		const obsolete = await this._manager(async m => m.obsolete());

		for (const pkg of obsolete) {
			this.log(pkg);
		}
	}
}
