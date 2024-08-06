import {Command, Flags, Args, Help} from '../command.ts';

/**
 * Help command.
 */
export class HelpCommand extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Show CLI help.';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {
		recursive: Flags.boolean({
			description: 'Include all child commands in output.',
			char: 'r'
		})
	};

	/**
	 * Arguments.
	 */
	public static readonly args = {
		command: Args.string({
			name: 'command',
			required: false,
			description: 'Command to show help for.'
		})
	};

	/**
	 * Strict mode.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		const {flags, argv} = await this.parse(HelpCommand);

		const help = new Help(this.config, {all: flags.recursive});
		await help.showHelp(argv as string[]);
	}
}
export default HelpCommand;
