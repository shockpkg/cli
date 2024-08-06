import {Command, Flags} from '../command.ts';

/**
 * List command.
 */
export class List extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'List all the packages in the package list.';

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
	public static readonly args = {};

	/**
	 * Handler.
	 */
	public async run() {
		await this.parse(List);

		const m = this._manager();
		for await (const pkg of m.packages()) {
			this.log(pkg.name);
		}
	}
}
export default List;
