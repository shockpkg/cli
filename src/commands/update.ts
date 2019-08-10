/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Update command.
 */
export default class Update extends Command {
	/**
	 * Description.
	 */
	public static description = 'update the packages list';

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
	public static args = [];

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Update);

		const {updated, added, removed} = await this._manager(
			async m => m.update()
		);
		const listed = [
			{
				name: 'updated',
				list: updated
			},
			{
				name: 'added',
				list: added
			},
			{
				name: 'removed',
				list: removed
			}
		];

		for (const {name, list} of listed) {
			if (!list.length) {
				continue;
			}
			this.log(`${name}:`);
			for (const {name} of list) {
				this.log(name);
			}
			this.log('');
		}

		for (const {name, list} of listed) {
			this.log(`${name}: ${list.length}`);
		}
	}
}
