/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * List command.
 */
export default class List extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = (
		'list all the packages in the package list'
	);

	/**
	 * Examples.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly flags = {
		help: flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		this.parse(List);

		await this._manager(async m => {
			for (const pkg of m.packageItter()) {
				this.log(pkg.name);
			}
		});
	}
}
