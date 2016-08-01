
var gulp = require('gulp'),
    fs = require('fs'),
    closureCompiler = require('gulp-closure-compiler'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    config = global.gulp.config;

module.exports = function(res,cb){
    console.log('\033[36mStarting Qa Build\033[37m');
    var _env = config.Tasks.Build.subtasks[res.SubTask],
        _file = './src/' + res.Type + '/'+res.Name+'/'+_env[(res.currentrule-1)]+'/'+res.Name+'.js',
        _cssFile = './src/' + res.Type + '/'+res.Name+'/' + res.Name + '.css',
        _currentRule = _env[res.currentrule];

    console.log('\033[36mStarting compiler for:\033[37m',res.Name);

    return gulp.src(_cssFile)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name))
    .on('end',function(){
      gulp.src(_file)
      .pipe(replace(/(\/\*CSS Include \*\/)(.*?)(\/\* End Css Include \*\/)/,'\r\nvar css = "'+fs.readFileSync(_cssFile.replace('.css','.min.css'))+'";\r\n'))
      .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
      .pipe(closureCompiler({
        compilerPath:"./compiler.jar",
        fileName:res.Name+".min.js",
        warning_level: 'QUIET'
      }))
      .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
      .on('end',cb);
    });
}
