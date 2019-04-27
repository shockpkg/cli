import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * File command.
 */
export default class File extends Command {
	/**
	 * Description.
	 */
	public static description = 'get package file path';

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
		const {args, flags, argv} = this.parse(File);
		const packageID = args.package;

		const file = await this._manager(m => m.packageInstallFile(packageID));

		this.log(file);
	}
}
