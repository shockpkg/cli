import {Command, Flags} from '../command.ts';

/**
 * Update command.
 */
export class Update extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Update the packages list.';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {
		help: Flags.help({char: 'h'}),
		summary: Flags.boolean({
			char: 's',
			description: 'Summarize the updated packages.'
		})
	};

	/**
	 * Arguments.
	 */
	public static readonly args = {};

	/**
	 * Handler.
	 */
	public async run() {
		const {flags} = await this.parse(Update);

		const m = this._manager();
		const {updated, added, removed} = await m.update();
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
		if (!flags.summary) {
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
export default Update;
