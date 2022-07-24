/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * List command.
 */
export class List extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'List all the packages in the package list.';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {
		help: Flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		await this.parse(List);

		// eslint-disable-next-line @typescript-eslint/require-await
		await this._manager(async m => {
			for (const pkg of m.packageItter()) {
				this.log(pkg.name);
			}
		});
	}
}
export default List;
