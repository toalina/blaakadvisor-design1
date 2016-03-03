var gulp = require('gulp');
var config = require('../config').production;

// Run this to compress all the things!
gulp.task('production', function(){
  // This runs only if the karma tests pass
  gulp.start(['cleanCSS', 'uglifyJs']);
});
