
var gulp = require('gulp'),
    config = global.gulp.config;

module.exports = function(res){
  console.log('\033[36mStarting Prod Build\033[37m');

  var _env = config.Tasks.Build.subtasks[res.SubTask],
      _file = './src/' + res.Type + '/'+res.Name+'/'+_env[(res.currentrule-1)]+'/'+res.Name+'.min.js',
      _currentRule = _env[res.currentrule];

  return gulp.src(_file)
  .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule));
}
