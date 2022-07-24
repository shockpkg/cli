/* eslint-env jasmine */

import {test} from '@oclif/test';

describe('version', () => {
	test.stdout()
		.command(['version'])
		.it('runs version', ctx => {
			expect(ctx.stdout).toContain('@shockpkg/cli/');
		});
});
