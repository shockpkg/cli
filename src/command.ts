import {Command as CommandBase, Help, Flags, Args, run} from '@oclif/core';
import sourceMapSupport from 'source-map-support';
import {Manager, IPackageInstalled} from '@shockpkg/core';

import {
	DEBUG_STACK_TRACE_ENV,
	DEBUG_SOURCE_MAPS_ENV,
	DEBUG_ERROR_LOG,
	UPDATE_INTERVAL_DEFAULT,
	UPDATE_INTERVAL_ENV
} from './constants.ts';
import {divmod, envTrue, envInteger} from './util.ts';
import {Progress, ProgressCallback} from './progress.ts';

// eslint-disable-next-line unicorn/prefer-export-from
export {Help, Flags, Args, run};

/**
 * Command object.
 */
export abstract class Command extends CommandBase {
	/**
	 * Init function.
	 *
	 * @returns Return data.
	 */
	public async init() {
		if (!envTrue(DEBUG_ERROR_LOG)) {
			this.config.errlog = '';
		}

		if (envTrue(DEBUG_SOURCE_MAPS_ENV)) {
			sourceMapSupport.install();
		}

		return super.init();
	}

	/**
	 * Custom error handler function.
	 *
	 * @param err Error value.
	 * @returns Return data if present.
	 */
	public async catch(err: Error) {
		try {
			return await super.catch(err);
		} catch (err) {
			// Always throw oclif errors.
			if (err && (err as {oclif: unknown}).oclif) {
				throw err;
			}

			// Throw if debug mode.
			if (this.config.debug || envTrue(DEBUG_STACK_TRACE_ENV)) {
				throw err;
			}

			// Otherwise, display error message if possible, otherwise throw.
			if (err && 'message' in err) {
				return this.error((err as {message: string}).message);
			}
			throw err;
		}
	}

	/**
	 * Get the update interval.
	 *
	 * @returns Update interval.
	 */
	protected _updateInterval() {
		const env = envInteger(UPDATE_INTERVAL_ENV);
		return env && env > 0 ? env : UPDATE_INTERVAL_DEFAULT;
	}

	/**
	 * Check if the shell is interactive.
	 *
	 * @returns True if interactive shell, else false.
	 */
	protected _isInteractive() {
		return process.stdout.isTTY || false;
	}

	/**
	 * Transfer seconds human readable.
	 *
	 * @param ms Miliseconds passed or null.
	 * @returns Formatted string.
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
	 * @returns Formatted string.
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
	 * @returns Progress update callback function.
	 */
	protected _transferProgressOutputInit() {
		let messageLongest = 0;

		/**
		 * Progress callback.
		 *
		 * @param time Time.
		 * @param total Total.
		 */
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
			const bytesSec = `${this._transferBytesHuman(bytesMs * 1000)}/s`;

			// Estimate remaining.
			const timeLeftMs = bytesMs ? total.remaining / bytesMs : null;
			const timeETA = this._transferSecondsHuman(timeLeftMs);

			// Assemble message.
			const message = [timePast, percent, amount, bytesSec, timeETA].join(
				'  '
			);

			// Remember the longest message.
			messageLongest = Math.max(messageLongest, message.length);
			const messagePadded = message.padEnd(messageLongest, ' ');

			if (this._isInteractive()) {
				process.stdout.write(`\r${messagePadded}\r`);
			} else {
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
	 * @returns Manager instance..
	 */
	protected _manager(): Manager {
		return new Manager();
	}

	/**
	 * Install events for reporting install progress.
	 *
	 * @param manager Manager instance.
	 * @param reason Install reason.
	 */
	protected _installEvents(manager: Manager, reason: string) {
		let delimit = false;
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
		manager.eventPackageDownloadBefore.on(e => {
			const pkg = e.package;
			const path = [pkg.name];
			for (let p = pkg.parent; p; p = p.parent) {
				path.push(p.name);
			}
			path.reverse();
			this.log(`downloading: ${path.join(': ')}`);
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
	}

	/**
	 * Count install report categories.
	 *
	 * @param report Report list.
	 * @returns Report counts.
	 */
	protected _installReportCounts(report: IPackageInstalled[]) {
		let installed = 0;
		let skipped = 0;
		for (const pkg of report) {
			if (pkg.install) {
				installed++;
			} else {
				skipped++;
			}
		}
		return {
			installed,
			skipped
		};
	}
}
