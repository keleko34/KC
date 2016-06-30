/* Gulp Modules */
var gulp = require('gulp')
  , file = require('gulp-file')
  , inject = require('gulp-inject')
  , replace = require('gulp-replace')
  , file = require('gulp-file')
  , closureCompiler = require('gulp-closure-compiler')
  , cssmin = require('gulp-cssmin')
  , rename = require('gulp-rename')
  , base = require('./../../Base')

  /* File and Stream Modules */
  , sort = require('sort-stream')
  , fs = require('fs');

var config = global.gulp.config;


module.exports = function(){

  var env = {

        /* This stage we strip away require and inline the html and css and inline concat the viewmodel */
        dev:function(res,cb){
          var _regexDefine = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/,
              _regexDefineEnd = /}\)(?![\s\S]*}\))/m,
              _file = './' + config[res.Type].base + '/'+res.Name+'/'+res.Name+'.js',
              _vmFile = _file.replace('.js','.vm.js'),
              _temFile = _file.replace('.js','.html'),
              _cssHtml = './Templates/Styles.js';

          var _g = gulp.src(_file)
            .pipe(inject(gulp.src(_vmFile),{
              relative:true,
              starttag: '/* BUILD SECTION */',
              endtag: '/* END BUILD SECTION */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting ViewModel:\033[37m',filepath);
                var __contents = file.contents.toString('utf8');
                __contents = __contents.replace(_regexDefineEnd,"}());");
                __contents = __contents.replace(_regexDefine,"\r\n/* HTML Include */\r\n/* End HTML Include */\r\nvar viewmodel = (function(){\r\n");
                __contents = __contents.replace(/\n/g,'\n'+Array(13).join(' '));
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
                __contents = __contents.replace(/\r\n/g,'');
                __contents = __contents.replace(/\n/g,'');
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
                __contents = __contents.replace(/(\$Component)/g,res.Name);
                __contents = __contents.replace(/\r\n/g,'\r\n' + Array(13).join(' '));
                return __contents;
              }
            }))
            .pipe(replace(_regexDefineEnd,"}())"))
            .pipe(replace(_regexDefine,("var Create"+res.Name+" = (function(){")))
            .pipe(replace('/* HTML Include */',''))
            .pipe(replace('/* End HTML Include */',''))
            .pipe(replace('/* CSS Include */',''))
            .pipe(replace('/* End CSS Include */',''))
            .pipe(replace(/^\s*[\r\n]/gm,''))
            .pipe(gulp.dest('./' + config[res.Type].base + '/'+res.Name+'/' + res.Environment));

            _g.on('end',cb);

            return _g;
        },

        /* This stage we minify and have dev for easy debug testing */
        qa:function(res,cb){
            var _file = './' + config[res.Type].base + '/'+res.Name+'/dev/'+res.Name+'.js';

            console.log('\033[36mStarting compiler for:\033[37m',res.Name);
            var _g =  gulp.src(_file)
            .pipe(gulp.dest('./' + config[res.Type].base + '/'+res.Name + '/' + res.Environment))
            .pipe(closureCompiler({
              compilerPath:"./compiler.jar",
              fileName:res.Name+".min.js"
            }))
            .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));

            _g.on('end',cb);

            return _g;
        },

        /* This stage is pure minified version for final check, auto documentation is made for methods and properties to fill, and css is minified */
        stage:function(res,cb){
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
        },

        /* This stage is the final minified product, Hooray! */
        prod:function(res){
          var _file = './' + config[res.Type].base + '/'+res.Name+'/stage/'+res.Name+'.min.js'
          gulp.src(_file)
          .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));
        }
      };

  function listComponents(res,key,prompts){
    if(key === 'Type'){
      prompts.Name.choices = fs.readdirSync('./' + config[res.Type].base)
      .filter(function(k,i){
        return k !== '.gitkeep';
      });
    }
  }

  function Exists(res,key){
    if(res.Type !== undefined && key === 'Name'){
      try
      {
        var exists = fs.statSync('./' + config[res.Type].base + '/' + res.Name + '/' + res.Name + '.js');
        if(!exists || !exists.isFile()){
          console.error('\033[31mThere is no ' + res.Type + ' by the name:\033[37m ',res.Name);
          process.exit(1);
        }
      }
      catch(e)
      {
        if(e.code === 'ENOENT'){
          console.error('\033[31mThere is no ' + res.Type + ' by the name:\033[37m ',res.Name);
        }
        console.error(e);
        process.exit(1);
      }
    }
  }

  function Command(res){
    console.log('\033[36mStarting to compile:\033[37m',res.Name,' \033[36mFor \033[37m',res.Environment,' \033[36menvironment\033[37m');
    return env[res.Environment](res,function(){
      console.log('\033[36mFinished compiling \033[37m',res.Name,' \033[36mfor \033[37m',res.Environment);
    });
  }


  return base.task('Build')
  .editPrompts(listComponents)
  .filter(Exists)
  .command(Command)
  .call();
}
