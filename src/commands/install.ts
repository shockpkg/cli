/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Install command.
 */
export default class Install extends Command {
	/**
	 * Description.
	 */
	public static description = (
		'install packages, slim method, fallback on full method'
	);

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
	public static args = [
		{
			name: 'packages',
			required: true,
			description: 'list of packages to be installed'
		}
	];

	/**
	 * Allow variable length arguments.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Install);

		await this._commandInstall(argv, 'best');
	}
}
