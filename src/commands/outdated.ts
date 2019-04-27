import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Outdated command.
 */
export default class Outdated extends Command {
	/**
	 * Description.
	 */
	public static description = 'list the outdated packages';

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
		const {args, flags, argv} = this.parse(Outdated);

		const outdated = await this._manager(m => m.outdated());

		for (const pkg of outdated) {
			this.log(pkg.name);
		}
	}
}
