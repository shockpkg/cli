/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * IsObsolete command.
 */
export class IsObsolete extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'check package is obsolete';

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
		const {args} = await this.parse(IsObsolete);
		const packageId = args.package as string;

		const obsolete = await this._manager(async m => {
			const installed = await m.isInstalled(packageId);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isObsolete(packageId);
		});
		if (!obsolete) {
			throw new Error('Package is not obsolete');
		}
		this.log('obsolete');
	}
}
export default IsObsolete;
