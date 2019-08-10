/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * UpgradeSlim command.
 */
export default class UpgradeSlim extends Command {
	/**
	 * Description.
	 */
	public static description = 'install packages, slim method';

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
		const {args, flags, argv} = this.parse(UpgradeSlim);

		await this._commandUpgrade('slim');
	}
}
