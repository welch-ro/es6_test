import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args.js';

gulp.task('pages', function(){
	return gulp.src('app/**/*.css')
		.pipe(gulp.dest('server/public'))
		.pipe(gulpif(args.watch, livereload()))
})