import {Command, Flags} from '../command';

/**
 * Path command.
 */
export class Path extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Get package manager path.';

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
		await this.parse(Path);

		const m = this._manager();
		this.log(m.path);
	}
}
export default Path;
