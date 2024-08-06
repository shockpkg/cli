import {spawn} from 'node:child_process';

export async function cli(args: string[]) {
	const cmd = process.platform.startsWith('win')
		? String.raw`.\bin\run.cmd`
		: './bin/run';
	const stdout: Buffer[] = [];
	const stderr: Buffer[] = [];
	const code = await new Promise<number | null>((resolve, reject) => {
		const p = spawn(cmd, args, {
			shell: true
		});
		p.stdout?.on('data', (data: Buffer) => {
			stdout.push(data);
		});
		p.stderr?.on('data', (data: Buffer) => {
			stderr.push(data);
		});
		p.once('close', resolve);
		p.once('error', reject);
	});
	return {
		code,
		stdout: Buffer.concat(stdout),
		stderr: Buffer.concat(stderr)
	};
}
