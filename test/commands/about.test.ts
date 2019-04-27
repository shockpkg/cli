import {test} from '@oclif/test';

describe('about', () => {
	test
		.stdout()
		.command(['about'])
		.it('runs about', ctx => {
			expect(ctx.stdout).toContain('Library Versions:');
		});
});
