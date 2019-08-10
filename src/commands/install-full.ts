/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * InstallFull command.
 */
export default class InstallFull extends Command {
	/**
	 * Description.
	 */
	public static description = 'install packages, full method';

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
		const {args, flags, argv} = this.parse(InstallFull);

		await this._commandInstall(argv, 'full');
	}
}
