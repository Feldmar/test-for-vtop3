export function python() {
	return app.gulp
		.src(app.path.src.python)
		.pipe(app.gulp.dest(app.path.build.python));
}

