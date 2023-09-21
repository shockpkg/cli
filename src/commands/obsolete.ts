import {Command, Flags} from '../command';

/**
 * Obsolete command.
 */
export class Obsolete extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'List obsolete installed packages.';

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
		await this.parse(Obsolete);

		const m = this._manager();
		const obsolete = await m.obsolete();
		for (const pkg of obsolete) {
			this.log(pkg);
		}
	}
}
export default Obsolete;
