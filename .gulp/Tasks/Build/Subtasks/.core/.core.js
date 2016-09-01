var gulp = require('gulp'),
    fs = require('fs'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    closureCompiler = require('gulp-closure-compiler'),
    config = global.gulp.config,
    reqConfig = fs.readFileSync('./.core/require.config.js',{encoding:'utf8'}),
    paths = JSON.parse(reqConfig.substring(reqConfig.indexOf('{',reqConfig.indexOf('paths')),reqConfig.indexOf('}',reqConfig.indexOf('paths'))+1).replace(/(\/\*)(.*?)(\*\/)/g,''));

module.exports = function(res,cb){
  console.log('\033[36mStarting To Build .core\033[37m');

  var _file = './.core/.core.js',
      _regexDefine = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/,
      _regexRequire = /(require)(.*)(function\()(.*)(\))(.*)(?:{)/,
      _regexDefineEnd = /}\)(?![\s\S]*}\))/m,
      koList = ['modularizer','override','extenders','ko'],
      bowerList = ['signals','crossroads','hasher','kb'],
      local = ['device'],
      _files = koList.map(function(m){
        return './.core/ko/'+m+'.js';
      })
      .concat(bowerList.map(function(m){
        return './'+paths[m]+'.js';
      }))
      .concat(local.map(function(m){
        return './.core/'+m+'.js'
      }))

  return gulp.src(_file)
  .pipe(inject(gulp.src(_files),{
    relative:true,
    starttag: '/* BUILD */',
    endtag: '/* END BUILD */',
    transform: function(filepath,file,i,len){
      console.log('\033[36mInjecting:\033[37m',filepath);
      var __contents = file.contents.toString('utf8');
      if(filepath.indexOf('bower_modules') === -1){
        __contents = __contents.replace(_regexDefineEnd,"}());\r\n");
        __contents = __contents.replace(_regexDefine,"\r\nvar Create"+filepath.substring((filepath.lastIndexOf('/')+1),filepath.lastIndexOf('.'))+" = (function(){\r\n");
      }
      return __contents;
    }
  }))
  .pipe(replace(_regexDefineEnd,'}())'))
  .pipe(replace(_regexRequire,'(function(){\r\nvar define = undefined;\r\n'))
  .pipe(rename({suffix: '.build'}))
  .pipe(gulp.dest('./.core'))
  .on('end',function(){
    console.log('\033[36mCompiling:\033[37m',' .core');
    return gulp.src(_file.replace('.js','.build.js'))
    .pipe(closureCompiler({
      compilerPath:"./compiler.jar",
      fileName:".core.min.js",
      warning_level: 'QUIET'
    }))
    .pipe(gulp.dest('./.core'))
    .on('end',cb);
  })
}
