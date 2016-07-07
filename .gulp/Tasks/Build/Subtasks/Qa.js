var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    config = global.gulp.config;

module.exports = function(res,cb){
    console.log('\033[36mStarting Qa Build\033[37m');

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
}
