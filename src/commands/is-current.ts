import {Command, Flags, Args} from '../command.ts';

/**
 * IsCurrent command.
 */
export class IsCurrent extends Command {
	/**
	 * Description.
	 */
	public static readonly description =
		'Check package is installed and current.';

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
		const {args} = await this.parse(IsCurrent);

		const m = this._manager();
		const installed = await m.isInstalled(args.package);
		if (!installed) {
			throw new Error('Package is not installed');
		}
		const current = await m.isCurrent(args.package);
		if (!current) {
			throw new Error('Package is not current');
		}
		this.log('installed');
	}
}
export default IsCurrent;
