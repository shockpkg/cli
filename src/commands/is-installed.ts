import {Command, Flags, Args} from '../command.ts';

/**
 * IsInstalled command.
 */
export class IsInstalled extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Check package is installed.';

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
		const {args} = await this.parse(IsInstalled);

		const m = this._manager();
		const installed = await m.isInstalled(args.package);
		if (!installed) {
			throw new Error('Package is not installed');
		}
		this.log('installed');
	}
}
export default IsInstalled;
