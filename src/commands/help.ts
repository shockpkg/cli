import {Command, Flags, Help} from '../command';

/**
 * Help command.
 */
export class HelpCommand extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'display help for <%= config.bin %>';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		recursize: Flags.boolean({
			description: 'include all child commands in output',
			char: 'r'
		})
	};

	/**
	 * Arguments.
	 */
	public static readonly args = [
		{
			name: 'command',
			required: false,
			description: 'command to show help for'
		}
	];

	/**
	 * Strict mode.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		const {flags, argv} = (await this.parse(HelpCommand)) as {
			argv: string[];
			flags: {recursive?: boolean};
		};
		const {recursive} = flags;
		const help = new Help(this.config, {all: recursive});
		await help.showHelp(argv);
	}
}
export default HelpCommand;
