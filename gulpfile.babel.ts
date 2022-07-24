import {readFile, rm, writeFile} from 'fs/promises';
import {basename} from 'path';
import {pipeline} from 'stream';
import {spawn} from 'child_process';
import {promisify} from 'util';

import gulp from 'gulp';
import gulpRename from 'gulp-rename';
import gulpInsert from 'gulp-insert';
import gulpFilter from 'gulp-filter';
import gulpReplace from 'gulp-replace';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpBabel from 'gulp-babel';

const pipe = promisify(pipeline);

async function exec(cmd: string, args: string[] = []) {
	const code = await new Promise<number | null>((resolve, reject) => {
		const p = spawn(cmd, args, {
			stdio: 'inherit',
			shell: true
		});
		p.once('close', resolve);
		p.once('error', reject);
	});
	if (code) {
		throw new Error(`Exit code: ${code}`);
	}
}

async function packageJson() {
	return JSON.parse(await readFile('package.json', 'utf8')) as {
		[p: string]: string;
	};
}

async function babelrc() {
	return {
		...JSON.parse(await readFile('.babelrc', 'utf8')),
		babelrc: false
	} as {
		presets: [string, unknown][];
		babelOpts: unknown[];
		plugins: unknown[];
	};
}

async function babelTarget(
	src: string[],
	dest: string,
	modules: string | boolean
) {
	const ext = modules ? '.js' : '.mjs';

	const babelOptions = await babelrc();
	for (const preset of babelOptions.presets) {
		if (preset[0] === '@babel/preset-env') {
			(preset[1] as {modules: string | boolean}).modules = modules;
		}
	}
	if (modules === 'commonjs') {
		babelOptions.plugins.push([
			'@babel/plugin-transform-modules-commonjs',
			{importInterop: 'node'}
		]);
	}
	babelOptions.plugins.push([
		'esm-resolver',
		{
			source: {
				extensions: [
					[['.js', '.mjs', '.jsx', '.mjsx', '.ts', '.tsx'], ext]
				]
			}
		}
	]);

	// Read the package JSON.
	const pkg = await packageJson();

	// Filter meta data file and create replace transform.
	const filterMeta = gulpFilter(['*/meta.ts'], {restore: true});
	const filterMetaReplaces = [
		["'@VERSION@'", JSON.stringify(pkg.version)],
		["'@NAME@'", JSON.stringify(pkg.name)]
	].map(([f, r]) => gulpReplace(f, r));

	await pipe(
		gulp.src(src),
		filterMeta,
		...filterMetaReplaces,
		filterMeta.restore,
		gulpSourcemaps.init(),
		gulpBabel(babelOptions as {}),
		gulpRename(path => {
			path.extname = ext;
		}),
		gulpSourcemaps.write('.', {
			includeContent: true,
			addComment: false,
			destPath: dest
		}),
		gulpInsert.transform((code, {path}) => {
			if (path.endsWith(ext)) {
				return `${code}\n//# sourceMappingURL=${basename(path)}.map\n`;
			}
			return code;
		}),
		gulp.dest(dest)
	);
}

// clean

gulp.task('clean', async () => {
	await Promise.all([
		rm('lib', {recursive: true, force: true}),
		rm('oclif.manifest.json', {force: true})
	]);
});

// lint

gulp.task('lint', async () => {
	await exec('eslint', ['.']);
});

// formatting

gulp.task('format', async () => {
	await exec('prettier', ['-w', '.']);
});

gulp.task('formatted', async () => {
	await exec('prettier', ['-c', '.']);
});

// build

gulp.task('build:dts', async () => {
	await exec('tsc');
});

gulp.task('build:cjs', async () => {
	await babelTarget(['src/**/*.ts'], 'lib', 'commonjs');
});

gulp.task('build:esm', async () => {
	await babelTarget(['src/**/*.ts'], 'lib', false);
});

gulp.task('build:manifest', async () => {
	await exec('oclif', ['manifest']);
});

gulp.task('build:readme', async () => {
	await exec('oclif', ['readme']);
	await writeFile(
		'README.md',
		(await readFile('README.md', 'utf8'))
			.replace(/(https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/)v/g, '$1')
			.replace(
				/(@shockpkg\/cli\/\S+) \S+ \S+/,
				'$1 platform-arch node-vX.X.X'
			)
	);
});

gulp.task(
	'build',
	gulp.series([
		gulp.parallel(['build:dts', 'build:cjs', 'build:esm']),
		'build:manifest',
		'build:readme'
	])
);

// test

gulp.task('test', async () => {
	await exec('jasmine');
});

// watch

gulp.task('watch', () => {
	gulp.watch(['src/**/*'], gulp.series(['all']));
});

// all

gulp.task('all', gulp.series(['clean', 'build', 'test', 'lint', 'formatted']));

// prepack

gulp.task('prepack', gulp.series(['clean', 'build']));

// default

gulp.task('default', gulp.series(['all']));
