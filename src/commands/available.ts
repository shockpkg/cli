import {Command, Flags} from '../command.ts';

/**
 * Available command.
 */
export class Available extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'List the available packages not installed.';

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
		await this.parse(Available);

		const m = this._manager();

		const installed = await m.installed();
		const installedSet = new Set(installed);

		for await (const pkg of m.packages()) {
			if (!installedSet.has(pkg)) {
				this.log(pkg.name);
			}
		}
	}
}
export default Available;
