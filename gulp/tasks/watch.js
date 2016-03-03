var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.javascript.src, ['webpack']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.index.src, ['index']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});

