import {Command, Flags, Args} from '../command';

/**
 * File command.
 */
export class File extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Get package file path.';

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
		const {args} = await this.parse(File);

		const file = await this._manager(async m =>
			m.packageInstallFile(args.package)
		);
		this.log(file);
	}
}
export default File;
