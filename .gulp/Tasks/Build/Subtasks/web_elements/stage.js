
var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    config = global.gulp.config;

module.exports = function(res,cb){
  console.log('\033[36mStarting Stage Build\033[37m');

  var _file = './src/' + res.Type + '/'+res.Name+'/qa/'+res.Name+'.min.js',
      _cssFile = './src/' + res.Type + '/'+res.Name+'/' + res.Name + '.css',
      _env = config.Tasks.Build.subtasks[res.SubTask];

  return gulp.src(_cssFile)
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name))
  .on('end',function(){
    gulp.src(_file)
    .pipe(replace(res.Name + '.css',res.Name + '.min.css'))
    .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _env[res.currentrule-1]))
    .on('end',cb);
  })
}
