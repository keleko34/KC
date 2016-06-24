/* Gulp Modules */
var gulp = require('gulp')
  , prompt = require('gulp-prompt')
  , file = require('gulp-file')
  , inject = require('gulp-inject')
  , replace = require('gulp-replace')
  , file = require('gulp-file')
  , closureCompiler = require('gulp-closure-compiler')
  , cssmin = require('gulp-cssmin')
  , rename = require('gulp-rename')

  /* File and Stream Modules */
  , sort = require('sort-stream')
  , fs = require('fs');

var config = global.gulp.config;


module.exports = function(){

  var component = '',
      env = {

        /* This stage we strip away require and inline the html and css and inline concat the viewmodel */
        dev:function(res,cb){
          var _regexDefine = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/,
              _regexDefineEnd = /}\)(?![\s\S]*}\))/m,
              _file = './' + config.components.base + '/'+res.component+'/'+res.component+'.js',
              _vmFile = _file.replace('.js','.vm.js'),
              _temFile = _file.replace('.js','.html'),
              _cssHtml = './' + config.tasks.Build.base + '/Templates/ComponentStyles.js';

          var _g = gulp.src(_file)
            .pipe(inject(gulp.src(_vmFile),{
              relative:true,
              starttag: '/* BUILD SECTION */',
              endtag: '/* END BUILD SECTION */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting ViewModel:\033[37m',filepath);
                var __contents = file.contents.toString('utf8');
                __contents = __contents.replace(_regexDefineEnd,"}());");
                __contents = __contents.replace(_regexDefine,"\r\n/* HTML Include */\r\n/* End HTML Include */\r\nvar viewmodel = (function(){");
                __contents = __contents.replace(/\r\n/g,'\r\n'+Array(13).join(' '));
                return __contents;
              }
            }))
            .pipe(inject(gulp.src(_temFile),{
              relative:true,
              starttag: '/* HTML Include */',
              endtag: '/* End HTML Include */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting Template:\033[37m',filepath);
                var __contents = file.contents.toString('utf8');
                __contents.replace(/\r\n/g,'');
                __contents = '/* CSS Include */\r\n/* End CSS Include */\r\n' + Array(13).join(' ') + 'var template = "' + __contents + '";';
                return __contents;
              }
            }))
            .pipe(inject(gulp.src(_cssHtml),{
              relative:true,
              starttag: '/* CSS Include */',
              endtag: '/* End CSS Include */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting CSS include Code:\033[37m',filepath);
                var __contents = file.contents.toString('utf8');
                __contents = '\r\n' + __contents;
                __contents = __contents.replace(/(\$Component)/g,res.component);
                __contents = __contents.replace(/\r\n/g,'\r\n' + Array(13).join(' '));
                return __contents;
              }
            }))
            .pipe(replace(_regexDefineEnd,"}())"))
            .pipe(replace(_regexDefine,("var Create"+res.component+" = (function(){")))
            .pipe(replace('/* HTML Include */',''))
            .pipe(replace('/* End HTML Include */',''))
            .pipe(replace('/* CSS Include */',''))
            .pipe(replace('/* End CSS Include */',''))
            .pipe(replace(/^\s*[\r\n]/gm,''))
            .pipe(gulp.dest('./' + config.components.base + '/'+res.component+'/' + res.environment));

            _g.on('end',cb);

            return _g;
        },

        /* This stage we minify and have dev for easy debug testing */
        qa:function(res,cb){
            var _file = './' + config.components.base + '/'+res.component+'/dev/'+res.component+'.js';

            console.log('\033[36mStarting compiler for:\033[37m',res.component);
            var _g =  gulp.src(_file)
            .pipe(gulp.dest('./' + config.components.base + '/'+res.component + '/' + res.environment))
            .pipe(closureCompiler({
              compilerPath:"./compiler.jar",
              fileName:res.component+".min.js"
            }))
            .pipe(gulp.dest('./' + config.components.base + '/' + res.component + '/'  + res.environment));

            _g.on('end',cb);

            return _g;
        },

        /* This stage is pure minified version for final check, auto documentation is made for methods and properties to fill, and css is minified */
        stage:function(res,cb){
          var _file = './' + config.components.base + '/'+res.component+'/qa/'+res.component+'.min.js',
              _docsFile = './' + config.components.base + '/'+res.component+'/README.md',
              _docrFile = './' + config.components.base + '/'+res.component+'/qa/'+res.component+'.js',
              _cssFile = './' + config.components.base + '/'+res.component+'/' + res.component + '.css'

          var _g = gulp.src(_file)
          .pipe(replace(res.component + '.css',res.component + '.min.css'))
          .pipe(gulp.dest('./' + config.components.base + '/' + res.component + '/'  + res.environment));

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
          .pipe(gulp.dest('./' + config.components.base + '/' + res.component));

          _g = gulp.src(_cssFile)
          .pipe(cssmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('./' + config.components.base + '/' + res.component));

          _g.on('end',cb);

          return _g;
        },

        /* This stage is the final minified product, Hooray! */
        prod:function(res){
          var _file = './' + config.components.base + '/'+res.component+'/stage/'+res.component+'.min.js'
          gulp.src(_file)
          .pipe(gulp.dest('./' + config.components.base + '/' + res.component + '/'  + res.environment));
        }
      };

  return gulp.src('*')
  .pipe(prompt.prompt({
    type: 'input',
    name: 'component',
    message: 'Which component would you like to build?'
  },Component))
  .pipe(prompt.prompt({
    type: 'list',
    name: 'environment',
    message: 'Which environment would you like to build for?',
    choices: ['dev','qa','stage','prod']
  },Environment));

  function Component(res){
    try
    {
      var exists = fs.statSync('./' + config.components.base + '/' + res.component + '/' + res.component + '.js');
      if(exists && exists.isFile()){
        component = res.component;
      }
      else
      {
        console.error('\033[31mThere is no component by the name:\033[37m ',res.component);
        process.exit(1);
      }
    }
    catch(e)
    {
      if(e.code === 'ENOENT'){
        console.error('\033[31mThere is no component by the name:\033[37m ',res.component);
      }
      else
      {
        console.error(e);
      }
      process.exit(1);
    }
  }

  function Environment(res){
    res.component = component;
    console.log('\033[36mStarting to compile:\033[37m',res.component,' \033[36mFor \033[37m',res.environment,' \033[36menvironment\033[37m');
    return env[res.environment](res,function(){
      console.log('\033[36mFinished compiling \033[37m',res.component,' \033[36mfor \033[37m',res.environment);
    });
  }
}
