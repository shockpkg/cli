import {flags} from '@oclif/command';

import {Command} from '../command';

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
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(IsInstalled);
		const packageID = args.package;

		const installed = await this._manager(m => m.isInstalled(packageID));
		if (!installed) {
			throw new Error('Package is not installed');
		}
		this.log('installed');
	}
}
