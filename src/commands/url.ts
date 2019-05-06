import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Url command.
 */
export default class Url extends Command {
	/**
	 * Description.
	 */
	public static description = 'get package manager package list URL';

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
		const {args, flags, argv} = this.parse(Url);

		await this._manager(async m => {
			this.log(m.packagesUrl);
		});
	}
}