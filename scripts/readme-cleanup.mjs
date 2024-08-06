import {readFile, writeFile} from 'node:fs/promises';

// eslint-disable-next-line jsdoc/require-jsdoc
async function main() {
	await writeFile(
		'README.md',
		(await readFile('README.md', 'utf8'))
			.replace(/(https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/)v/g, '$1')
			.replace(
				/(@shockpkg\/cli\/\S+) \S+ \S+/,
				'$1 platform-arch node-vX.X.X'
			)
	);
}
main().catch(err => {
	console.error(err);
	process.exitCode = 1;
});
