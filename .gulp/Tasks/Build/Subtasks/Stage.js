var gulp = require('gulp'),
    replace = require('gulp-replace'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    fs = require('fs'),
    config = global.gulp.config;

module.exports = function(res,cb){
  console.log('\033[36mStarting Stage Build\033[37m');

  var _file = './' + config[res.Type].base + '/'+res.Name+'/qa/'+res.Name+'.min.js',
      _docsFile = './' + config[res.Type].base + '/'+res.Name+'/README.md',
      _vmDocrFile = './' + config[res.Type].base + '/'+res.Name+'/'+res.Name+'.vm.js',
      _docrFile = './' + config[res.Type].base + '/'+res.Name+'/qa/'+res.Name+'.js',
      _cssFile = './' + config[res.Type].base + '/'+res.Name+'/' + res.Name + '.css'

  var _g = gulp.src(_file)
  .pipe(replace(res.Name + '.css',res.Name + '.min.css'))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));

  _g = gulp.src(_docsFile)
  .pipe(inject(gulp.src(_vmDocrFile),{
      relative:true,
      starttag: '###### Properties',
      transform: function(filepath,file,i,len,target){
        console.log('\033[36mCreating Property Docs:\033[37m');
        var __contents = file.contents.toString('utf8'),
            __targetContents = target.contents.toString('utf8'),
            __rx = /this\.(.*?)\s=/gm,
            __props = __contents.match(__rx);
            if(__props){
              __props = __props.map(function(k,i){
                return k.replace(/this\./g,'').replace(/\s=/g,'')+' (*Type*)<br />\r\n**Description**'+( i !== (__props.length-1) ? '\r\n\r\n' : '');
              })
              return __props.join('');
            }
        return '*No Properties*';
      }
  }))
  .pipe(inject(gulp.src(_vmDocrFile),{
      relative:true,
      starttag: '###### Methods',
      transform: function(filepath,file,i,len, target){
        console.log('\033[36mCreating Method Docs:\033[37m');
        var __contents = file.contents.toString('utf8'),
            __targetContents = target.contents.toString('utf8'),
            __rx = /prototype\.(.*?)\s=/gm,
            __props = __contents.match(__rx);
            if(__props){
              __props = __props.map(function(k,i){
                return k.replace(/this\./g,'').replace(/\s=/g,'')+' (*Type \'Param\'*)<br />\r\n**Description**'+( i !== (__props.length-1) ? '\r\n\r\n' : '');
              })
              return __props.join('');
            }
        return '*No Methods*';
      }
  }))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name));

  _g = gulp.src(_cssFile)
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name));

  _g.on('end',cb);

  return _g;
}
