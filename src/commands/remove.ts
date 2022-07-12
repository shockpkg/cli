/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * Remove command.
 */
export class Remove extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'remove packages';

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
	public static readonly args = [
		{
			name: 'packages',
			required: true,
			description: 'list of packages to be removed'
		}
	];

	/**
	 * Allow variable length arguments.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		const {argv} = this.parse(Remove);

		await this._manager(async m => {
			for (const pkg of argv) {
				this.log(pkg);
				// eslint-disable-next-line no-await-in-loop
				const removed = await m.remove(pkg);
				if (!removed) {
					this.warn(`nothing to remove for: ${pkg}`);
				}
			}
		});
	}
}
export default Remove;
