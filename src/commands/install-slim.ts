import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * InstallSlim command.
 */
export default class InstallSlim extends Command {
	/**
	 * Description.
	 */
	public static description = 'install packages, slim method';

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
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(InstallSlim);

		await this._commandInstall(argv, 'slim');
	}
}
