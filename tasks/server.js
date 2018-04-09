import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args.js';

gulp.task('server', function(cb){
	if(!args.watch) return cb;

	var server = liveserver.new(['--harmony', 'server/bin/www']) //--harmony：在当前命令行下去执行当前的脚本（server/bin/www）
	server.start();

	//监听文件的变化，进行构建
	gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file){
		server.notity.apply(server, [file]);
	})

	//监听服务是否有变化，有变化要重启服务
	gulp.watch(['server/toutes/**/*.js','server/app.js'], function(){
		server.start.bind(server)()
	})
})