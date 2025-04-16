const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);
task('build:docker:icons', buildIconsForDocker);

function copyIcons(dist = 'dist') {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve(dist, 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve(dist, 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function buildIconsForDocker() {
	// read outDir from tsconfig.docker.json
	const tsconfig = require('./tsconfig.docker.json');
	const outDir = tsconfig.compilerOptions.outDir;

	copyIcons(outDir);
	return Promise.resolve();
}
