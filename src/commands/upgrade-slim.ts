import {flags} from '@oclif/command';

import {Command} from '../command';

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
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(UpgradeSlim);

		await this._commandUpgrade('slim');
	}
}
