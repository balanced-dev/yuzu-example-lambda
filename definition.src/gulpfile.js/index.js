const gulp = require('gulp');
const config = require('./config'); 
const base = require('./config').base; 
const files = require('./config').files; 
const server = require('./browser-sync'); 

const dist = require('./dist'); 
const style = require('./style'); 
const templates = require('./templates'); 

//load modules into gulp friendly container
$ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-*', 'block-*', 'yuzu-def-*', 'browser-sync', 'run-sequence', 'handlebars', 'path', 'del'],
	camelize: true
}),

//plumber setup
gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
		.pipe($.plumber(function(error) {
			// Output an error message
			$.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
			// emit the end event, to properly end the task
			this.emit('end');
		}));
};

const watch = (done) => {

    gulp.watch([files.scssSetup, files.partialscss], style.reload);
	gulp.watch([base.devTemplates + '/**/*.schema'], templates.reload);
	gulp.watch([base.devTemplates + '/**/*.hbs'], templates.reload);
	gulp.watch([base.devTemplates + '/**/*.json'], templates.reload);
	
	done();
};

const buildUi = gulp.parallel(templates.run, style.run);

exports.buildUi = buildUi;
exports.ui = gulp.series(buildUi, watch, server.init);
exports.watch = watch;
exports.dist = gulp.series(dist.style, dist.templates);
exports.showPaths = config.showPaths;