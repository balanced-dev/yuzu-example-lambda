const gulp = require('gulp'); 
const paths = require('./config').paths; 
const files = require('./config').files; 
const server = require('./browser-sync'); 

// Build Frontend SCSS Style
const buildStyles = () => {
    return gulp.src(files.styles)
      .pipe($.sourcemaps.init())
      .pipe($.sassGlob())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer(["cover 95%"], {
            cascade: false
        }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.styles.dest));
};

// Build Backend SCSS Style
const buildBackOfficeStyles = () => {
    return gulp.src(files.stylesBackOffice)
      .pipe($.sourcemaps.init())
      .pipe($.sassGlob())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer(["cover 95%"], {
            cascade: false
        }))
      .pipe(gulp.dest(paths.styles.dest));
};

const run = gulp.series(buildStyles, buildBackOfficeStyles);

exports.run = run;
exports.reload = gulp.series(run, server.reload);