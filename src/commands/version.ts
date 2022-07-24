import {Command} from '../command';

/**
 * Version command.
 */
export class VersionCommand extends Command {
	/**
	 * Description.
	 */
	public static readonly description = 'Show CLI version.';

	/**
	 * Examples.
	 */
	public static readonly examples = [];

	/**
	 * Flags.
	 */
	public static readonly flags = {};

	/**
	 * Arguments.
	 */
	public static readonly args = [];

	/**
	 * Strict mode.
	 */
	public static readonly strict = false;

	/**
	 * Handler.
	 */
	public async run() {
		await this.parse(VersionCommand);
		this.log(this.config.userAgent);
	}
}
export default VersionCommand;
