/* eslint-disable import/no-default-export */

import {
	Command,
	flags
} from '../command';

/**
 * Info command.
 */
export default class Info extends Command {
	/**
	 * Description.
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly description = 'view info for package';

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
	public static readonly args = [
		{
			name: 'package',
			required: true,
			description: 'package id'
		}
	];

	/**
	 * Handler.
	 */
	public async run() {
		const {args} = this.parse(Info);
		const packageID = args.package;

		await this._manager(async m => {
			const pkg = m.packageByUnique(packageID);
			if (!pkg) {
				throw new Error(`Unknown package ID: ${packageID}`);
			}

			this.log(`name:      ${pkg.name}`);
			this.log(`file:      ${pkg.file}`);
			this.log(`size:      ${pkg.size}`);
			this.log(`sha256:    ${pkg.sha256}`);
			this.log(`sha1:      ${pkg.sha1}`);
			this.log(`md5:       ${pkg.md5}`);
			this.log(`source:    ${pkg.source}`);

			const parents: string[] = [];
			for (let p = pkg.parent; p; p = p.parent) {
				parents.push(p.name);
			}
			if (parents.length) {
				this.log(`parents:   ${parents.join(' > ')}`);
			}

			if (!await m.isInstalled(pkg)) {
				return;
			}

			const install = await m.packageInstallFile(pkg);
			this.log(`installed: ${install}`);

			const current = await m.isCurrent(pkg);
			this.log(`current:   ${current}`);
		});
	}
}
