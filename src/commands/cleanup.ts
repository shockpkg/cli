/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Cleanup command.
 */
export default class Cleanup extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = (
		'cleanup temporary files and obsolete packages'
	);

	/**
	 * Examples.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly flags = {
		help: flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly args = [];

	/**
	 * Handler.
	 */
	public async run() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {args, flags, argv} = this.parse(Cleanup);

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
