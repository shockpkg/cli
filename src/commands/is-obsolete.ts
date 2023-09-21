import {Command, Flags, Args} from '../command';

/**
 * IsObsolete command.
 */
export class IsObsolete extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Check package is obsolete.';

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
		const {args} = await this.parse(IsObsolete);

		const obsolete = await this._manager(async m => {
			const installed = await m.isInstalled(args.package);
			if (!installed) {
				throw new Error('Package is not installed');
			}
			return m.isObsolete(args.package);
		});
		if (!obsolete) {
			throw new Error('Package is not obsolete');
		}
		this.log('obsolete');
	}
}
export default IsObsolete;
