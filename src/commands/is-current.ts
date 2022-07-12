/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * IsCurrent command.
 */
export class IsCurrent extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description =
		'check package is installed and current';

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
		const {args} = this.parse(IsCurrent);
		const packageID = args.package as string;

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
export default IsCurrent;
