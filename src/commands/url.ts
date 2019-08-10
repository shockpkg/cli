/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Url command.
 */
export default class Url extends Command {
	/**
	 * Description.
	 */
	public static description = 'get package manager package list URL';

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
		const {args, flags, argv} = this.parse(Url);

		await this._manager(async m => {
			this.log(m.packagesUrl);
		});
	}
}
