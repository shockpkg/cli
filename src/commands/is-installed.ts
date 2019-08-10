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
	public static description = 'check package is installed';

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
		const {args, flags, argv} = this.parse(IsInstalled);
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
