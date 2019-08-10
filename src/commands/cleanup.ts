/* eslint-disable import/no-default-export */

import {flags} from '@oclif/command';

import {Command} from '../command';

/**
 * Cleanup command.
 */
export default class Cleanup extends Command {
	/**
	 * Description.
	 */
	public static description = 'cleanup temporary files and obsolete packages';

	/**
	 * Examples.
	 */
	public static examples = [];

	/**
	 * Flags.
	 */
	public static flags = {
		help: flags.help({char: 'h'})
	};

	/**
	 * Arguments.
	 */
	public static args = [];

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
