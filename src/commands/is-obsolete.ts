/* eslint-disable import/no-default-export */

import {Command, flags} from '../command';

/**
 * IsObsolete command.
 */
export class IsObsolete extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'check package is obsolete';

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
		const {args} = this.parse(IsObsolete);
		const packageID = args.package as string;

		const obsolete = await this._manager(async m => {
			const installed = await m.isInstalled(packageID);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isObsolete(packageID);
		});
		if (!obsolete) {
			throw new Error('Package is not obsolete');
		}
		this.log('obsolete');
	}
}
export default IsObsolete;
