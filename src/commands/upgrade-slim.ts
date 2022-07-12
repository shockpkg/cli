/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * UpgradeSlim command.
 */
export class UpgradeSlim extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'install packages, slim method';

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
		this.parse(UpgradeSlim);

		await this._commandUpgrade('slim');
	}
}
export default UpgradeSlim;
