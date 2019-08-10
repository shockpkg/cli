/* eslint-disable import/no-default-export */

import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * IsCurrent command.
 */
export default class IsCurrent extends Command {
	/**
	 * Description.
	 */
	public static description = 'check package is installed and current';

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
		const {args, flags, argv} = this.parse(IsCurrent);
		const packageID = args.package;

		const current = await this._manager(async m => {
			const installed = await m.isInstalled(packageID);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isCurrent(packageID);
		});
		if (!current) {
			throw new Error('Package is not current');
		}
		this.log('installed');
	}
}
