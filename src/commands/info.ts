/* eslint-disable import/no-default-export */

import {Command, Flags, Args} from '../command';

/**
 * Info command.
 */
export class Info extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'View info for package.';

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
		package: Args.string({
			name: 'package',
			required: true,
			description: 'Package ID.'
		})
	};

	/**
	 * Handler.
	 */
	public async run() {
		const {args} = await this.parse(Info);

		await this._manager(async m => {
			const pkg = m.packageByUnique(args.package);
			if (!pkg) {
				throw new Error(`Unknown package ID: ${args.package}`);
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

			if (!(await m.isInstalled(pkg))) {
				return;
			}

			const install = await m.packageInstallFile(pkg);
			this.log(`installed: ${install}`);

			const current = await m.isCurrent(pkg);
			this.log(`current:   ${current ? 'true' : 'false'}`);
		});
	}
}
export default Info;
