/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Verify);
		const packageID = args.package;

		await this._manager(async m => m.packageInstallVerify(packageID));

		this.log('verified');
	}
}
