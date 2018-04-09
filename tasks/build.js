import gulp from 'gulp';
import gulpSequence form 'gulp-sqeuence'

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'server']))