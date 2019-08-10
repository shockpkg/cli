/* eslint-disable import/no-default-export */

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(File);
		const packageID = args.package;

		const file = await this._manager(
			async m => m.packageInstallFile(packageID)
		);

		this.log(file);
	}
}
