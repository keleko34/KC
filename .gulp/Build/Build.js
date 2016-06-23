/* Need to inject viewmodel and template */

var gulp = require('gulp')
  , prompt = require('gulp-prompt')
  , file = require('gulp-file')
  , inject = require('gulp-inject')
  , sort = require('sort-stream')
  , replace = require('gulp-replace')
  , file = require('gulp-file')
  , closureCompiler = require('gulp-closure-compiler')
  , fs = require('fs');

var config = global.gulp.config;

module.exports = function(){
  return gulp.src('*')
  .pipe(prompt.prompt({
    type: 'input',
    name: 'component',
    message: 'Which component would you like to build?'
  },Command));

  function Command(res){
    fs.stat('./' + config.components.base + '/'+res.component+'/'+res.component+'.js',function(err,stats){
      if(!err && stats.isFile())
      {
        console.log('\033[36mStarting to compile component:\033[37m',res.component);
        var ignore = [
              './'+res.component+'.js',
              './Build/'+res.component+'.js',
              './Min/'+res.component+'.min.js']
          , subFiles = gulp.src(['./' + config.components.base + res.component + '/**/*.js']).pipe(sort(function(a,b){
            return 1;
          }))
          , reD = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/
          , reE = /}\)(?![\s\S]*}\))/m;

        gulp.src('./' + config.components.base + '/'+res.component+'/'+res.component+'.js')
        .pipe(inject(subFiles,{
          relative:true,
          starttag: '/* BUILD SECTION */',
          endtag: '/* END BUILD SECTION */',
          transform: function(filepath,file,i,length){
            if(ignore.indexOf('./'+filepath) < 0)
            {
              console.log('\033[36mInjecting File:\033[37m',filepath);
              var contents = file.contents.toString('utf8'),
                  re = /(function Create)(.*)(\()/,
                  module = 'Create'+re.exec(contents)[2];

              contents = contents.replace(reE,"}());");
              contents = contents.replace(reD,"var "+module+" = (function(){");
              return contents;
            }
            else
            {
              return "";
            }
          },
          ignorePath:ignore
        }))
        .pipe(replace(reE,"}())"))
        .pipe(replace(reD,("var Create"+res.component+" = (function(){")))
        .pipe(gulp.dest('./' + config.components.base + '/'+res.component+'/Build'));

        console.log('\033[36mRunning clojure compiler minification:\033[37m');

        gulp.src('./' + config.components.base + '/'+res.component+'/Build/'+res.component+'.js')
        .pipe(closureCompiler({
          compilerPath:"./compiler.jar",
          fileName:res.component+".min.js"
        }))
        .pipe(gulp.dest('./' + config.components.base + '/'+res.component+'/Min'));

      }
      else
      {
        console.error('\033[31mThere is no component by the name:\033[37m ',res.component);
      }
    });
  }
}
