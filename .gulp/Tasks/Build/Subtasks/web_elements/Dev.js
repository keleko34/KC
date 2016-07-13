var gulp = require('gulp'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    config = global.gulp.config;

module.exports = function(res,cb){
  console.log('\033[36mStarting Dev Build\033[37m');

  var _regexDefine = /(define)(.*)(function\()(.*)(\))(.*)(?:{)/,
      _regexDefineEnd = /}\)(?![\s\S]*}\))/m,
      _file = './Src/' + res.Type + '/'+res.Name+'/'+res.Name+'.js',
      _vmFile = _file.replace('.js','.vm.js'),
      _bpFile = _file.replace('.js','.bp.js'),
      _temFile = _file.replace('.js','.html'),
      _cssHtml = './Templates/Styles.js',
      _env = config.Tasks.Build.subtasks[res.SubTask];

  return gulp.src(_file)
    .pipe(inject(gulp.src(_vmFile),{
      relative:true,
      starttag: '/* BUILD SECTION */',
      endtag: '/* END BUILD SECTION */',
      transform: function(filepath,file,i,len){
        console.log('\033[36mInjecting ViewModel:\033[37m',filepath);
        var __contents = file.contents.toString('utf8');
        __contents = __contents.replace(_regexDefineEnd,"}());\r\n/* BluePrint Include */\r\n/* End Blueprint Include */\r\n");
        __contents = __contents.replace(_regexDefine,"\r\n/* HTML Include */\r\n/* End HTML Include */\r\nvar viewmodel = (function(){\r\n");
        __contents = __contents.replace(/\n/g,'\n'+Array(13).join(' '));
        return __contents;
      }
    }))
    .pipe(inject(gulp.src(_bpFile),{
      relative:true,
      starttag: '/* BluePrint Include */',
      endtag: '/* End Blueprint Include */',
      transform: function(filepath,file,i,len){
        console.log('\033[36mInjecting Blueprint:\033[37m',filepath);
        var __contents = file.contents.toString('utf8');
        __contents = 'var blueprint = {\r\nregister_'+res.Name+':'+__contents.substring(__contents.indexOf('function register_'),__contents.length)+'\r\n}\r\n';
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
        __contents = __contents.replace(/(")/g,'\\"')
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
    .pipe(gulp.dest('./Src/' + res.Type + '/'+res.Name+'/' + _env[res.currentrule]))
    .on('end',cb);
}
