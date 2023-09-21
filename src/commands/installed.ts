import {Command, Flags} from '../command';

/**
 * Installed command.
 */
export class Installed extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'List the installed packages.';

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
		await this.parse(Installed);

		const m = this._manager();
		const installed = await m.installed();
		for (const pkg of installed) {
			this.log(pkg.name);
		}
	}
}
export default Installed;
