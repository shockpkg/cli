import {Command, Flags} from '../command.ts';

/**
 * Url command.
 */
export class Url extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'Get package manager package list URL.';

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
		await this.parse(Url);

		const m = this._manager();
		this.log(m.packagesUrl);
	}
}
export default Url;
