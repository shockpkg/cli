/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * IsCurrent command.
 */
export class IsCurrent extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'check package is installed and current';

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
		const {args} = await this.parse(IsCurrent);
		const packageId = args.package as string;

		const current = await this._manager(async m => {
			const installed = await m.isInstalled(packageId);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isCurrent(packageId);
		});
		if (!current) {
			throw new Error('Package is not current');
		}
		this.log('installed');
	}
}
export default IsCurrent;
