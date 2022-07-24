/* eslint-disable import/no-default-export */

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
	public static readonly args = [];

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
		// eslint-disable-next-line @typescript-eslint/require-await
		await this._manager(async m => {
			this.log(`  Packages Loaded: ${m.loaded ? 'true' : 'false'}`);
			this.log(`  Install Path: ${m.path}`);
			this.log(`  Packages URL: ${m.packagesUrl}`);
		});

		this.log('');
	}
}
export default About;
