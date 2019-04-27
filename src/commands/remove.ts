import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Remove command.
 */
export default class Remove extends Command {
	/**
	 * Description.
	 */
	public static description = 'remove packages';

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
			name: 'packages',
			required: true,
			description: 'list of packages to be removed'
		}
	];

	/**
	 * Allow variable length arguments.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		// tslint:disable-next-line: no-unused
		const {args, flags, argv} = this.parse(Remove);

		await this._manager(async m => {
			for (const pkg of argv) {
				this.log(pkg);
				const removed = await m.remove(pkg);
				if (!removed) {
					this.warn(`nothing to remove for: ${pkg}`);
				}
			}
		});
	}
}
