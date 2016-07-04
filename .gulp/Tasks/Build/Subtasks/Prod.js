var gulp = require('gulp'),
    config = global.gulp.config;

module.exports = function(res){
  var _file = './' + config[res.Type].base + '/'+res.Name+'/stage/'+res.Name+'.min.js'
  gulp.src(_file)
  .pipe(gulp.dest('./' + config[res.Type].base + '/' + res.Name + '/'  + res.Environment));
}
