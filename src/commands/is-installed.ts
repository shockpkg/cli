/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * IsInstalled command.
 */
export class IsInstalled extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'check package is installed';

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
		const {args} = await this.parse(IsInstalled);
		const packageID = args.package as string;

		const installed = await this._manager(async m =>
			m.isInstalled(packageID)
		);
		if (!installed) {
			throw new Error('Package is not installed');
		}
		this.log('installed');
	}
}
export default IsInstalled;
