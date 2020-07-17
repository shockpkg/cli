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
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'update the packages list';

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
		help: flags.help({char: 'h'}),
		summary: flags.boolean({
			char: 's',
			description: 'Summarize the updated packages'
		})
	};

	/**
	 * Arguments.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Update);
		const {summary} = flags;

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

		if (!summary) {
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
		}

		for (const {name, list} of listed) {
			this.log(`${name}: ${list.length}`);
		}
	}
}
