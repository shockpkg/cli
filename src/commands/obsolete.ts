import {flags} from '@oclif/command';

import {Command} from '../command';

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
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(Obsolete);

		const obsolete = await this._manager(m => m.obsolete());

		for (const pkg of obsolete) {
			this.log(pkg);
		}
	}
}
