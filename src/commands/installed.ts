import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Installed command.
 */
export default class Installed extends Command {
	/**
	 * Description.
	 */
	public static description = 'list the installed packages';

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
		const {args, flags, argv} = this.parse(Installed);

		const installed = await this._manager(m => m.installed());

		for (const pkg of installed) {
			this.log(pkg.name);
		}
	}
}
