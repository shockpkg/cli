/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * IsInstalled command.
 */
export default class IsInstalled extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'check package is installed';

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
		const {args} = this.parse(IsInstalled);
		const packageID = args.package;

		const installed = await this._manager(
			async m => m.isInstalled(packageID)
		);
		if (!installed) {
			throw new Error('Package is not installed');
		}
		this.log('installed');
	}
}
