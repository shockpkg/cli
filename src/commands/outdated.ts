import {Command, Flags} from '../command';

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

		const outdated = await this._manager(async m => m.outdated());
		for (const pkg of outdated) {
			this.log(pkg.name);
		}
	}
}
export default Outdated;
