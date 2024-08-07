import {Command, Flags, Args} from '../command.ts';

/**
 * Verify command.
 */
export class Verify extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Verify an installed package.';

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
		const {args} = await this.parse(Verify);

		const m = this._manager();
		await m.packageInstallVerify(args.package);
		this.log('verified');
	}
}
export default Verify;
