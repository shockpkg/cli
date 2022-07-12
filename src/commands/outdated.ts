/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * Outdated command.
 */
export class Outdated extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'list the outdated packages';

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
		this.parse(Outdated);

		const outdated = await this._manager(async m => m.outdated());

		for (const pkg of outdated) {
			this.log(pkg.name);
		}
	}
}
export default Outdated;
