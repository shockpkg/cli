/* eslint-disable import/no-default-export */

import {Command, Flags, Args} from '../command';

/**
 * IsCurrent command.
 */
export class IsCurrent extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'Check package is installed and current.';

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
	public static readonly args = {
		package: Args.string({
			name: 'package',
			required: true,
			description: 'Package ID.'
		})
	};

	/**
	 * Handler.
	 */
	public async run() {
		const {args} = await this.parse(IsCurrent);

		const current = await this._manager(async m => {
			const installed = await m.isInstalled(args.package);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isCurrent(args.package);
		});
		if (!current) {
			throw new Error('Package is not current');
		}
		this.log('installed');
	}
}
export default IsCurrent;
