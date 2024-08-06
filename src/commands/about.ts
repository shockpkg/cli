import {
	NAME as SHOCKPKG_CORE_NAME,
	VERSION as SHOCKPKG_CORE_VERSION
} from '@shockpkg/core';

import {NAME, VERSION} from '../meta';
import {Command, Flags} from '../command';

/**
 * About command.
 */
export class About extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Show info about CLI.';

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
		await this.parse(About);

		this.log('Version:');
		this.log(`  ${NAME}: ${VERSION}`);

		this.log('');

		this.log('Library Versions:');
		for (const info of [[SHOCKPKG_CORE_NAME, SHOCKPKG_CORE_VERSION]]) {
			this.log(`  ${info[0]}: ${info[1]}`);
		}

		this.log('');

		this.log('Info:');
		const m = this._manager();
		this.log(`  Install Path: ${m.path}`);
		this.log(`  Packages URL: ${m.packagesUrl}`);
		try {
			await m.load();
		} catch {
			// Ignore any read or parse errors.
		}
		this.log(`  Packages Loaded: ${m.loaded ? 'true' : 'false'}`);

		this.log('');
	}
}
export default About;
