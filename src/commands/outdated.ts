/* eslint-disable import/no-default-export */

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Outdated);

		const outdated = await this._manager(async m => m.outdated());

		for (const pkg of outdated) {
			this.log(pkg.name);
		}
	}
}
