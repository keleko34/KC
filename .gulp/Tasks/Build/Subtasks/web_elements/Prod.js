var gulp = require('gulp'),
    config = global.gulp.config;

module.exports = function(res){
  console.log('\033[36mStarting Prod Build\033[37m');

  var _file = './Src/' + res.Type + '/'+res.Name+'/stage/'+res.Name+'.min.js',
      _env = config.Tasks.Build.subtasks[res.SubTask];

  return gulp.src(_file)
  .pipe(gulp.dest('./Src/' + res.Type + '/' + res.Name + '/'  + _env[res.currentrule]));
}
