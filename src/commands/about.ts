/* eslint-disable import/no-default-export */

import {
	NAME as SHOCKPKG_CORE_NAME,
	VERSION as SHOCKPKG_CORE_VERSION
} from '@shockpkg/core';

import {
	NAME,
	VERSION
} from '../meta';
import {
	Command,
	flags
} from '../command';

/**
 * About command.
 */
export default class About extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'display info about program';

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
		const {args, flags} = this.parse(About);

		this.log('Version:');
		this.log(`  ${NAME}: ${VERSION}`);

		this.log('');

		this.log('Library Versions:');
		for (const info of [
			[SHOCKPKG_CORE_NAME, SHOCKPKG_CORE_VERSION]
		]) {
			this.log(`  ${info[0]}: ${info[1]}`);
		}

		this.log('');

		this.log('Info:');
		await this._manager(async m => {
			this.log(`  Packages Loaded: ${m.loaded}`);
			this.log(`  Install Path: ${m.path}`);
			this.log(`  Packages URL: ${m.packagesUrl}`);
		});

		this.log('');
	}
}
