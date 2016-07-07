var gulp = require('gulp'),
    config = global.gulp.config;

module.exports = function(res){
  console.log('\033[36mStarting Prod Build\033[37m');

  var _file = './' + config[res.Type].base + '/'+res.Name+'/stage/'+res.Name+'.min.js'
  gulp.src(_file)
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));
}
