import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Obsolete command.
 */
export default class Obsolete extends Command {
	/**
	 * Description.
	 */
	public static description = 'list the available packages not installed';

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

		await this._manager(async m => {
			const installed = await m.installed();
			const installedSet = new Set(installed);

			for (const pkg of m.packageItter()) {
				if (!installedSet.has(pkg)) {
					this.log(pkg.name);
				}
			}
		});
	}
}
