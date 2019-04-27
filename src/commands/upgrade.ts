import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Upgrade command.
 */
export default class Upgrade extends Command {
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
		const {args, flags, argv} = this.parse(Upgrade);

		await this._commandUpgrade('slim');
	}
}
