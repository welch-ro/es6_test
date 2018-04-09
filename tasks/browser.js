import gulp from 'gulp';
import gulpif from 'gulp-if';
import util from 'gulp-util';
import args from './util/args';

gulp.task('browser', function(cb){
	if(!args.watch) return cb();

	gulp.watch('app/**/*.js', ['scripts']);
	gulp.watch('app/**/*.ejs', ['pages']);
	gulp.watch('app/**/*.css', ['css']);
})