var gulp = require('gulp');
    htmlv = require('gulp-html-validator');
var config = require('../config').valid;

// Default
gulp.task('valid', function () {
  gulp.src(config.src)
    .pipe(htmlv())
    .pipe(gulp.dest('./out'));
});
