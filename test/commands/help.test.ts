/* eslint-env jasmine */

import {test} from '@oclif/test';

describe('help', () => {
	test.stdout()
		.command(['help'])
		.it('runs help', ctx => {
			expect(ctx.stdout).toContain('shockpkg - shockpkg CLI');
		});
});
