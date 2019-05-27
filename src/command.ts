import {Command as CommandBase} from '@oclif/command';
import {install as sourceMapSupportInstall} from 'source-map-support';
import {
	Manager,
	Package,
	IPackageInstalled
} from '@shockpkg/core';

import {
	DEBUG_STACK_TRACE_ENV,
	DEBUG_SOURCE_MAPS_ENV,
	UPDATE_INTERVAL_DEFAULT,
	UPDATE_INTERVAL_ENV
} from './constants';
import {
	divmod,
	envTrue,
	envInteger
} from './util';
import {
	Progress,
	ProgressCallback
} from './progress';

const noRangeHeadersErrorMessage =
	'Unexpected status code: 200 expected: 206';

const failedInstallSlimTryFullMessage =
	'Failed to stream using slim method, trying full';

/**
 * Command constructor.
 */
export abstract class Command extends CommandBase {
	/**
	 * Init function.
	 */
	public async init() {
		if (envTrue(DEBUG_SOURCE_MAPS_ENV)) {
			sourceMapSupportInstall();
		}

		return super.init();
	}

	/**
	 * Custom error handler function.
	 *
	 * @param err Error value.
	 */
	public async catch(err: any) {
		try {
			return await super.catch(err);
		}
		catch (err) {
			// Always throw oclif errors.
			if (err.oclif) {
				throw err;
			}

			// Throw if debug mode.
			if (this.config.debug || envTrue(DEBUG_STACK_TRACE_ENV)) {
				throw err;
			}

			// Otherwise, display error message if possible, otherwise throw.
			if (err && (err.message || err.message === '')) {
				this.error(err.message);
				return;
			}
			throw err;
		}
	}

	/**
	 * Get the update interval.
	 *
	 * @return Update interval.
	 */
	protected _updateInterval() {
		const env = envInteger(UPDATE_INTERVAL_ENV);
		return (env && env > 0) ? env : UPDATE_INTERVAL_DEFAULT;
	}

	/**
	 * Check if the shell is interactive.
	 *
	 * @return True if interactive shell, else false.
	 */
	protected _isInteractive() {
		return process.stdout.isTTY || false;
	}

	/**
	 * Transfer seconds human readable.
	 *
	 * @param ms Miliseconds passed or null.
	 * @return Formatted string.
	 */
	protected _transferSecondsHuman(ms: number | null) {
		if (ms === null) {
			return '-:--:--';
		}
		const seconds = Math.round(ms / 1000);
		const [minutes, s] = divmod(seconds, 60);
		const [h, m] = divmod(minutes, 60);
		const mStr = m < 10 ? `0${m}` : m;
		const sStr = s < 10 ? `0${s}` : s;
		return `${h}:${mStr}:${sStr}`;
	}

	/**
	 * Transfer bytes human readable.
	 *
	 * @param size Byte size.
	 * @return Formatted string.
	 */
	protected _transferBytesHuman(size: number) {
		let based = size;
		const base = 1024;
		const names = ['B', 'K', 'M', 'G', 'T'];
		const il = names.length - 1;
		let i = 0;
		for (; based > base && i < il; i++) {
			based /= base;
		}
		return `${based.toFixed(2)}${names[i]}`;
	}

	/**
	 * Init data transfer progress output function.
	 *
	 * @return Progress update callback function.
	 */
	protected _transferProgressOutputInit() {
		let messageLongest = 0;
		const r: ProgressCallback = (time, total) => {
			// Calcaulte the time spent.
			const timePast = this._transferSecondsHuman(time.duration);

			// Calcaulte progress.
			const progress = total.current / total.total;
			const percent = `${(progress * 100).toFixed(2)}%`;

			// Calcaulte amounts.
			const amountCurrent = this._transferBytesHuman(total.current);
			const amountTotal = this._transferBytesHuman(total.total);
			const amount = [
				`${amountCurrent} (${total.current})`,
				`${amountTotal} (${total.total})`
			].join(' / ');

			// Calculate speed.
			const bytesMs = time.delta ? total.delta / time.delta : 0;
			const bytesSec = this._transferBytesHuman(bytesMs * 1000) + '/s';

			// Estimate remaining.
			const timeLeftMs = bytesMs ? total.remaining / bytesMs : null;
			const timeETA = this._transferSecondsHuman(timeLeftMs);

			// Assemble message.
			const message = [
				timePast,
				percent,
				amount,
				bytesSec,
				timeETA
			].join('  ');

			// Remember the longest message.
			messageLongest = Math.max(messageLongest, message.length);
			const messagePadded = message.padEnd(messageLongest, ' ');

			if (this._isInteractive()) {
				process.stdout.write(`\r${messagePadded}\r`);
			}
			else {
				this.log(messagePadded);
			}
		};
		return r;
	}

	/**
	 * Clear data transfer progress output after.
	 */
	protected _transferProgressOutputAfter() {
		if (this._isInteractive()) {
			this.log('');
		}
	}

	/**
	 * Run an async function with a manager instance.
	 *
	 * @param handler Handler function.
	 * @return Return value of the handler function.
	 */
	protected async _manager<T>(handler: (manager: Manager) => Promise<T>) {
		return (new Manager()).with(handler);
	}

	/**
	 * Install events for reporting install progress.
	 *
	 * @param manager Manager instance.
	 * @param reason Install reason.
	 */
	protected _installEvents(manager: Manager, reason: string) {
		let delimit = false;
		let streaming: Package | null = null;
		let progress: Progress | null = null;

		manager.eventPackageInstallCurrent.on(e => {
			if (delimit) {
				this.log('');
			}
			const {name} = e.package;
			this.warn(`${name}: current version already installed`);
			delimit = true;
		});
		manager.eventPackageInstallBefore.on(e => {
			if (delimit) {
				this.log('');
			}
			const {name} = e.package;
			this.log(`${reason}: ${name}`);
			delimit = true;
		});
		manager.eventPackageInstallAfter.on(e => {
			this.log(`${reason} complete`);
		});
		manager.eventPackageStreamBefore.on(e => {
			const pkg = e.package;
			const {source} = pkg;

			// Streaming packages stream multiple pieces, only report once.
			// Let the extract phase handle the progess reporting.
			if (pkg !== streaming) {
				streaming = pkg;
				this.log(`streaming: ${source}`);
			}
		});
		manager.eventPackageDownloadBefore.on(e => {
			const pkg = e.package;
			const {source} = pkg;
			this.log(`downloading: ${source}`);

			if (progress) {
				throw new Error('Internal error: Progress is already active');
			}
			progress = new Progress(pkg.size);
			progress.start(
				this._updateInterval(),
				this._transferProgressOutputInit()
			);
		});
		manager.eventPackageDownloadProgress.on(e => {
			if (!progress) {
				throw new Error('Internal error: Progress inactive');
			}
			progress.set(e.amount);
		});
		manager.eventPackageDownloadAfter.on(e => {
			if (!progress) {
				throw new Error('Internal error: Progress inactive');
			}
			progress.end();
			progress = null;
			this._transferProgressOutputAfter();
			this.log('download complete');
		});
		manager.eventPackageExtractBefore.on(e => {
			const pkg = e.package;
			const {name} = pkg;
			const parent = pkg.parent;
			if (!parent) {
				throw new Error('Internal error: Extract has no parent');
			}

			this.log(`extracting: ${name} from: ${parent.name}`);

			if (progress) {
				throw new Error('Internal error: Progress is already active');
			}
			progress = new Progress(pkg.size);
			progress.start(
				this._updateInterval(),
				this._transferProgressOutputInit()
			);
		});
		manager.eventPackageExtractProgress.on(e => {
			if (!progress) {
				throw new Error('Internal error: Progress inactive');
			}
			progress.set(e.amount);
		});
		manager.eventPackageExtractAfter.on(e => {
			if (!progress) {
				throw new Error('Internal error: Progress inactive');
			}
			progress.end();
			progress = null;
			this._transferProgressOutputAfter();
			streaming = null;
			this.log('extract complete');
		});
	}

	/**
	 * Count install report categories.
	 *
	 * @param report Report list.
	 * @return Report counts.
	 */
	protected _installReportCounts(report: IPackageInstalled[]) {
		let installed = 0;
		let skipped = 0;
		for (const pkg of report) {
			if (pkg.installed) {
				installed++;
			}
			else {
				skipped++;
			}
		}
		return {
			installed,
			skipped
		};
	}

	/**
	 * Shared install command runner.
	 *
	 * @param packages Pacakges list.
	 * @param method Install method.
	 */
	protected async _commandInstall(packages: string[], method: string) {
		const report: IPackageInstalled[] = [];

		let installer: (m: Manager, pkg: Package) => Promise<Package[]>;
		switch (method) {
			case 'slim': {
				installer = (m, pkg) => m.installSlim(pkg);
				break;
			}
			case 'full': {
				installer = (m, pkg) => m.installFull(pkg);
				break;
			}
			case 'best': {
				installer = async (m, pkg) => {
					try {
						const r = await m.installSlim(pkg);
						return r;
					}
					catch (err) {
						if (err && err.message === noRangeHeadersErrorMessage) {
							this.warn(failedInstallSlimTryFullMessage);
						}
						else {
							throw err;
						}
					}
					return m.installFull(pkg);
				};
				break;
			}
			default: {
				throw new Error(
					`Internal error: Unknown install method: ${method}`
				);
			}
		}

		await this._manager(async m => {
			this._installEvents(m, 'install');
			const list = m.packagesDependOrdered(packages);
			for (const pkg of list) {
				const installed = await installer(m, pkg);
				report.push({
					package: pkg,
					installed
				});
			}
		});

		const {installed, skipped} = this._installReportCounts(report);
		this.log('');
		this.log(`installed: ${installed}`);
		this.log(`skipped: ${skipped}`);
	}

	/**
	 * Shared upgrade command runner.
	 *
	 * @param method Install method.
	 */
	protected async _commandUpgrade(method: string) {
		let report: IPackageInstalled[];
		switch (method) {
			case 'slim': {
				report = await this._manager(async m => {
					this._installEvents(m, 'upgrade');
					return m.upgradeSlim();
				});
				break;
			}
			case 'full': {
				report = await this._manager(async m => {
					this._installEvents(m, 'upgrade');
					return m.upgradeFull();
				});
				break;
			}
			default: {
				throw new Error(
					`Internal error: Unknown upgrade method: ${method}`
				);
			}
		}
		const {installed, skipped} = this._installReportCounts(report);
		this.log('');
		this.log(`upgraded: ${installed}`);
		this.log(`skipped: ${skipped}`);
	}
}
