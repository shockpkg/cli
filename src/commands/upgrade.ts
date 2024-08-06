import {Command, Flags} from '../command.ts';

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

		const m = this._manager();
		this._installEvents(m, 'upgrade');
		const report = await m.upgrade();
		const {installed, skipped} = this._installReportCounts(report);
		this.log('');
		this.log(`upgraded: ${installed}`);
		this.log(`skipped: ${skipped}`);
	}
}
export default Upgrade;
