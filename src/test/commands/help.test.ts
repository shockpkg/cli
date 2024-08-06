import {describe, it} from 'node:test';
import {ok, strictEqual} from 'node:assert';

import {cli} from '../../util.spec.ts';

void describe('help', () => {
	void it('output', async () => {
		const {code, stdout, stderr} = await cli(['help']);
		strictEqual(code, 0);
		ok(stdout.toString().includes('shockpkg - The shockpkg CLI'), '');
		strictEqual(stderr.toString(), '');
	});
});
