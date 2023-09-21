import {Command, Flags} from '../command';

/**
 * Upgrade command.
 */
export class Upgrade extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Upgrade all outdated packages.';

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
		await this.parse(Upgrade);

		const report = await this._manager(async m => {
			this._installEvents(m, 'upgrade');
			return m.upgrade();
		});
		const {installed, skipped} = this._installReportCounts(report);
		this.log('');
		this.log(`upgraded: ${installed}`);
		this.log(`skipped: ${skipped}`);
	}
}
export default Upgrade;
