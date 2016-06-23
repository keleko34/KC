/* Globals */
global.gulp = {};
global.gulp.config = require('./.gulp/config.js')

/* Gulp Processing Modules */
var gulp = require('gulp');

/* Gulp Task Modules */
var Create = require('./.gulp/Create/Create'),
    Build = require('./.gulp/Build/Build');

gulp.task('default',['build'])
gulp.task('build', Build);
gulp.task('create',Create);
