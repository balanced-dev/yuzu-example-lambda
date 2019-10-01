const gulp = require('gulp'); 
const { series, parallel } = require('gulp');
const paths = require('./config').paths; 
const files = require('./config').files; 
const server = require('./browser-sync'); 
const yuzu = require('yuzu-definition-core');

const clearTemplateOutput = () => {

	return $.del([ files.templateHTML ]);
};

const renderTemplates = () => {

	return gulp.src(files.templatePages + '/**/*.json')
		.pipe(yuzu.gulpBuild(files.templatePartials, $.yuzuDefinitionHbsHelpers, paths.handlebars.data.layout))
		.pipe($.rename(function (path) {
			path.dirname = path.dirname.replace('data', '');
			path.extname = ".html";
		}))
		.pipe(gulp.dest(files.templateHTML));
};

exports.run = series(clearTemplateOutput, renderTemplates);
exports.reload = series(renderTemplates, server.reload);
