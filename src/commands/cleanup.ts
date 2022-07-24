/* eslint-disable import/no-default-export */

import {Command, Flags} from '../command';

/**
 * Cleanup command.
 */
export class Cleanup extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'Cleanup temporary files and obsolete packages.';

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
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		await this.parse(Cleanup);

		await this._manager(async m => {
			m.eventPackageCleanupBefore.on(e => {
				this.log(e.package);
			});
			m.eventPackageCleanupAfter.on(e => {
				// Should not normally happen, but possible.
				if (!e.removed) {
					this.warn(`nothing to remove for: ${e.package}`);
				}
			});
			return m.cleanup();
		});
	}
}
export default Cleanup;
