/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Path command.
 */
export default class Path extends Command {
	/**
	 * Description.
	 */
	public static description = 'get package manager path';

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
		const {args, flags, argv} = this.parse(Path);

		await this._manager(async m => {
			this.log(m.path);
		});
	}
}
