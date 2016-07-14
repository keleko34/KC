var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    config = global.gulp.config;

module.exports = function(res,cb){
    console.log('\033[36mStarting Qa Build\033[37m');

    var _file = './Src/' + res.Type + '/'+res.Name+'/dev/'+res.Name+'.js',
        _env = config.Tasks.Build.subtasks[res.SubTask];

    console.log('\033[36mStarting compiler for:\033[37m',res.Name);

    return  gulp.src(_file)
    .pipe(gulp.dest('./Src/' + res.Type + '/'+res.Name + '/' + _env[res.currentrule]))
    .pipe(closureCompiler({
      compilerPath:"./compiler.jar",
      fileName:res.Name+".min.js",
      warning_level: 'QUIET'
    }))
    .pipe(gulp.dest('./Src/' + res.Type + '/' + res.Name + '/'  + _env[res.currentrule]))
    .on('end',cb);
}
