import {describe, it} from 'node:test';
import {ok, strictEqual} from 'node:assert';

import {cli} from '../../util.spec.ts';

void describe('version', () => {
	void it('output', async () => {
		const {code, stdout, stderr} = await cli(['version']);
		strictEqual(code, 0);
		ok(stdout.toString().includes('@shockpkg/cli/'), '');
		strictEqual(stderr.toString(), '');
	});
});
