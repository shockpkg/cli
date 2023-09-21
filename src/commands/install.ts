import {Command, Flags, Args} from '../command';

/**
 * Install command.
 */
export class Install extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Install packages.';

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
			description: 'List of packages to be installed.'
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
		const {argv} = await this.parse(Install);

		const report = await this._manager(async m => {
			this._installEvents(m, 'install');
			return m.installMulti(argv as string[]);
		});

		const {installed, skipped} = this._installReportCounts(report);
		this.log('');
		this.log(`installed: ${installed}`);
		this.log(`skipped: ${skipped}`);
	}
}
export default Install;
