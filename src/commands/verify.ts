import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Verify command.
 */
export default class Verify extends Command {
	/**
	 * Description.
	 */
	public static description = 'verify an installed package';

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
			name: 'package',
			required: true,
			description: 'package id'
		}
	];

	/**
	 * Handler.
	 */
	public async run() {
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(Verify);
		const packageID = args.package;

		await this._manager(m => m.packageInstallVerify(packageID));

		this.log('verified');
	}
}
