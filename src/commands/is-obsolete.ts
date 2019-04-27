import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * IsObsolete command.
 */
export default class IsObsolete extends Command {
	/**
	 * Description.
	 */
	public static description = 'check package is obsolete';

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
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(IsObsolete);
		const packageID = args.package;

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
