var gulp = require('gulp'),
    replace = require('gulp-replace'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    config = global.gulp.config;

module.exports = function(res,cb){
  var _file = './' + config[res.Type].base + '/'+res.Name+'/qa/'+res.Name+'.min.js',
      _docsFile = './' + config[res.Type].base + '/'+res.Name+'/README.md',
      _docrFile = './' + config[res.Type].base + '/'+res.Name+'/qa/'+res.Name+'.js',
      _cssFile = './' + config[res.Type].base + '/'+res.Name+'/' + res.Name + '.css'

  var _g = gulp.src(_file)
  .pipe(replace(res.Name + '.css',res.Name + '.min.css'))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));

  _g = gulp.src(_docsFile)
  .pipe(inject(gulp.src(_docrFile),{
      relative:true,
      starttag: '###### Properties',
      endtag: '*End Properties*',
      transform: function(filepath,file,i,len){
        console.log('\033[36mCreating Property Docs:\033[37m');
        var __contents = file.contents.toString('utf8');

        return "";
      }
  }))
  .pipe(replace('*End Properties*',''))
  .pipe(inject(gulp.src(_docrFile),{
      relative:true,
      starttag: '###### Methods',
      endtag: '*End Methods*',
      transform: function(filepath,file,i,len){
        console.log('\033[36mCreating Method Docs:\033[37m');
        var __contents = file.contents.toString('utf8');

        return "";
      }
  }))
  .pipe(replace('*End Methods*',''))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name));

  _g = gulp.src(_cssFile)
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name));

  _g.on('end',cb);

  return _g;
}
