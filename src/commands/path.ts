import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Path command.
 */
export default class Path extends Command {
	/**
	 * Description.
	 */
	public static description = 'get package manager path';

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
		const {args, flags, argv} = this.parse(Path);

		await this._manager(async m => {
			this.log(m.path);
		});
	}
}