const gulp = require('gulp'); 
const paths = require('./config').paths; 
const files = require('./config').files; 
const server = require('./browser-sync'); 
const sassdoc = require('sassdoc');

// Build Frontend SCSS Style
const buildStyles = () => {
    return gulp.src(files.styles)
      .pipe($.sourcemaps.init())
      .pipe($.sassGlob())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer(["cover 95%"], {
          cascade: false
      }))
      .pipe($.cleanCss())
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
      .pipe($.cleanCss())
      .pipe(gulp.dest(paths.styles.dest));
};

// Build SCSS docs
const buildStyleDocumentation = () => {
  const options = {
      groups: {
      '-library-': 'Library',
      '-project-': 'Project'
      },
      dest: base.devCompiled + '/sassdoc',
      sort: [
          "group",
          "file",
          "line",
          "access",
      ]
  };

  return gulp.src(base.devRoot + '/**/*.scss')
    .pipe(sassdoc(options));
};

const run = gulp.series(buildStyles, buildBackOfficeStyles, buildStyleDocumentation);

exports.run = run;
exports.reload = gulp.series(run, server.reload);