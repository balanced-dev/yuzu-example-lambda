
const gulp = require('gulp'); 
const paths = require('./config').paths; 
const files = require('./config').files; 

const distCss = () => {

	return gulp.src(paths.styles.dest + '/**/*')
		.pipe($.stripCssComments({
			all: true
		}))
		.pipe($.cleanCss())
		.pipe(gulp.dest(paths.styles.dist))
};

const distUiInventory = () => {

	gulp.src(paths.images.dest + '/**/*')
		.pipe(gulp.dest(paths.images.dist));

	gulp.src(paths.js.dest + '/**/*')
		.pipe(gulp.dest(paths.js.dist));

	gulp.src(paths.libraryStyles.dest + '/**/*')
		.pipe(gulp.dest(paths.libraryStyles.dist));	

	return gulp.src(base.devRoot + '/templates.html')
		.pipe(gulp.dest(base.distRoot));
};

const distCleanTemplates = () => {

	return $.del([
		paths.handlebars.pages.dist + '/**/*'
  	], { force: true });
};

const distCopyBlocks = () => {

	return gulp.src([paths.handlebars.pages.src + '/blocks/**/*.hbs'])
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.pages.dist + '/src/blocks'));

};

const distCopyBlocksHtml = () => {

	return gulp.src(paths.handlebars.pages.dest + '/blocks/**/*')
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.pages.dist + '/html/blocks/'));
};

const distCopyPages = () => {

	return gulp.src([paths.handlebars.pages.src + '/pages/**/*.hbs'])
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.pages.dist + '/src/pages'));
};

const distCopyPagesHtml = () => {

	return gulp.src(paths.handlebars.pages.dest + '/pages/**/*')
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.pages.dist + '/html/pages/'));
};


const distSchemaPages = () => {

	return gulp.src(files.templatePages + '/pages/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpSchema(files.templatePartials, false))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.schema.dist +'/pages'));
};

const distSchemaBlocks = () => {

	return gulp.src(files.templatePages + '/blocks/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpSchema(files.templatePartials, true))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.schema.dist +'/blocks'));
};

const distData = () => {

	return gulp.src(files.templatePages + '/pages/**/*.json')
		.pipe($.yuzuDefinitionCore.gulpData(files.templatePartials))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.data.dist));
};

const distPaths = () => {

	return gulp.src(files.templatePages + '/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpPaths(files.templatePartials))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.paths.dist));
};

exports.style = gulp.series(distCss, distUiInventory);
exports.templates = gulp.series(distCleanTemplates, distCopyBlocks, distCopyPages, distCopyPagesHtml, distCopyBlocksHtml, distSchemaPages, distSchemaBlocks, distData, distPaths);