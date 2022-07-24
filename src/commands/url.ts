/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * Url command.
 */
export class Url extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'get package manager package list URL';

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
		await this.parse(Url);

		// eslint-disable-next-line @typescript-eslint/require-await
		await this._manager(async m => {
			this.log(m.packagesUrl);
		});
	}
}
export default Url;
