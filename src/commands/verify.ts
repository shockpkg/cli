/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * Verify command.
 */
export class Verify extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'verify an installed package';

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
	public static readonly args = [
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
		const {args} = await this.parse(Verify);
		const packageId = args.package as string;

		await this._manager(async m => m.packageInstallVerify(packageId));

		this.log('verified');
	}
}
export default Verify;
