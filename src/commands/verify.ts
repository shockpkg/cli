/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * Verify command.
 */
export class Verify extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'verify an installed package';

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
			name: 'package',
			required: true,
			description: 'package id'
		}
	];

	/**
	 * Handler.
	 */
	public async run() {
		const {args} = this.parse(Verify);
		const packageID = args.package as string;

		await this._manager(async m => m.packageInstallVerify(packageID));

		this.log('verified');
	}
}
export default Verify;
