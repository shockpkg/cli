/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * Url command.
 */
export class Url extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'get package manager package list URL';

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
		this.parse(Url);

		// eslint-disable-next-line @typescript-eslint/require-await
		await this._manager(async m => {
			this.log(m.packagesUrl);
		});
	}
}
export default Url;
