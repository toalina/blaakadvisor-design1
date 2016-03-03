var gulp      = require('gulp');
var config    = require('../config').production;
var cleanCSS = require('gulp-clean-css');
var size      = require('gulp-filesize');

gulp.task('cleanCSS', ['sass'], function() {
  return gulp.src(config.cssSrc)
    .pipe(cleanCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.cssDest))
    .pipe(size());
});
