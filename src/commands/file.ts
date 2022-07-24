/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * File command.
 */
export class File extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'get package file path';

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
		const {args} = await this.parse(File);
		const packageId = args.package as string;

		const file = await this._manager(async m =>
			m.packageInstallFile(packageId)
		);

		this.log(file);
	}
}
export default File;
