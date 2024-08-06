import {Command, Flags} from '../command.ts';

/**
 * Outdated command.
 */
export class Outdated extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'List outdated installed packages.';

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
		await this.parse(Outdated);

		const m = this._manager();
		const outdated = await m.outdated();
		for (const pkg of outdated) {
			this.log(pkg.name);
		}
	}
}
export default Outdated;
