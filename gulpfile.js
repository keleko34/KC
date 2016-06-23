/* Globals */
global.gulp = {};
global.gulp.config = require('./.gulp/config.js')

/* Gulp Processing Modules */
var gulp = require('gulp')
  , prompt = require('gulp-prompt')
  , inject = require('gulp-inject')
  , sort = require('sort-stream')
  , replace = require('gulp-replace')
  , file = require('gulp-file')
  , closureCompiler = require('gulp-closure-compiler')
  , fs = require('fs');

/* Gulp Task Modules */
var Create = require('./.gulp/Create/Create')

gulp.task('build', function(){
  return gulp.src('*')
  .pipe(prompt.prompt({
    type: 'input',
    name: 'component',
    message: 'Which component would you like to build?'
  },
  function(res){
    fs.stat('./Components/'+res.component+'/'+res.component+'.js',function(err,stats){
      if(!err && stats.isFile())
      {
        console.log('\033[36mStarting to compile component:\033[37m',res.component);
        var ignorePath = ['./'+res.component+'.js','./Build/'+res.component+'.js','./Min/'+res.component+'.min.js']
          , subFiles = gulp.src(['./'+res.component+'/**/*.js']).pipe(sort(function(a,b){
            return 1;
          }))
          , reD = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/
          , reE = /}\)(?![\s\S]*}\))/m;
        gulp.src('./Components/'+res.component+'/'+res.component+'.js')
        .pipe(inject(subFiles,{
          relative:true,
          starttag: '/* BUILD SECTION */',
          endtag: '/* END BUILD SECTION */',
          transform: function(filepath,file,i,length){
            if(ignorePath.indexOf('./'+filepath) < 0)
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
          ignorePath:ignorePath
        }))
        .pipe(replace(reE,"}())"))
        .pipe(replace(reD,("var Create"+res.component+" = (function(){")))
        .pipe(gulp.dest('./Components/'+res.component+'/Build'));

        console.log('\033[36mRunning clojure compiler minification:\033[37m');
        gulp.src('./Components/'+res.component+'/Build/'+res.component+'.js')
        .pipe(closureCompiler({
          compilerPath:"./compiler.jar",
          fileName:res.component+".min.js"
        }))
        .pipe(gulp.dest('./Components/'+res.component+'/Min'));
      }
      else
      {
        console.error('\033[31mThere is no component by the name:\033[37m ',res.component);
      }
    });
  }));
});

gulp.task('create',Create);
