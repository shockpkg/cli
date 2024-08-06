import {describe, it} from 'node:test';
import {ok, strictEqual} from 'node:assert';

import {cli} from '../../util.spec.ts';

void describe('about', () => {
	void it('output', async () => {
		const {code, stdout, stderr} = await cli(['about']);
		strictEqual(code, 0);
		ok(stdout.toString().includes('Version:'), '');
		ok(stdout.toString().includes('Library Versions:'), '');
		ok(stdout.toString().includes('Info:'), '');
		strictEqual(stderr.toString(), '');
	});
});
