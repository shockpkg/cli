/**
 * Integer division with remainder.
 *
 * @param v Value.
 * @param d Divisor.
 * @returns Integer divided and remainder.
 */
export function divmod(v: number, d: number) {
	return [Math.floor(v / d), v % d];
}

/**
 * Get environment variable value.
 *
 * @param name Variable name.
 * @returns String value or null.
 */
export function env(name: string) {
	// eslint-disable-next-line no-process-env
	const v = process.env[name];
	// eslint-disable-next-line no-undefined
	return v === undefined ? null : v;
}

/**
 * Get environment variable as a boolean value.
 *
 * @param name Variable name.
 * @returns Boolean value.
 */
export function envBool(name: string) {
	const v = env(name);
	if (v) {
		if (/^(1|true|yes)$/i.test(v)) {
			return true;
		}
		else if (/^(0|false|no)$/i.test(v)) {
			return false;
		}
	}
	return null;
}

/**
 * Check if the environment variable value is true.
 *
 * @param name Variable name.
 * @returns Boolean value.
 */
export function envTrue(name: string) {
	return envBool(name) === true;
}

/**
 * Check if the environment variable value is false.
 *
 * @param name Variable name.
 * @returns Boolean value.
 */
export function envFalse(name: string) {
	return envBool(name) === false;
}

/**
 * Get environment variable as a number.
 *
 * @param name Variable name.
 * @returns Number value.
 */
export function envNumber(name: string) {
	const str = env(name);
	return str ? +str : null;
}

/**
 * Get environment variable as a number.
 *
 * @param name Variable name.
 * @returns Number value.
 */
export function envInteger(name: string) {
	const num = envNumber(name);
	if (num === 0) {
		return num;
	}
	return num && Number.isInteger(num) ? num : null;
}
