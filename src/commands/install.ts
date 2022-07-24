/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * Install command.
 */
export class Install extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description =
		'install packages, slim method, fallback on full method';

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
			description: 'list of packages to be installed'
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
		const {argv} = this.parse(Install);

		await this._commandInstall(argv);
	}
}
export default Install;
