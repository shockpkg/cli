import {Command, Flags, Args} from '../command';

/**
 * Remove command.
 */
export class Remove extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Remove packages.';

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
	public static readonly args = {
		packages: Args.string({
			name: 'packages',
			required: true,
			description: 'List of packages to be removed.'
		})
	};

	/**
	 * Allow variable length arguments.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		const {argv} = await this.parse(Remove);

		await this._manager(async m => {
			for (const pkg of argv as string[]) {
				this.log(pkg);
				// eslint-disable-next-line no-await-in-loop
				const removed = await m.remove(pkg);
				if (!removed) {
					this.warn(`nothing to remove for: ${pkg}`);
				}
			}
		});
	}
}
export default Remove;
