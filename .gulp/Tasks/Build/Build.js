/* Gulp Modules */
var gulp = require('gulp'),
    fs = require('fs'),
    base = require('./../../Base');

var config = global.gulp.config;

module.exports = function(){

  function Exists(res,key){
    if(res.Type !== undefined && key === 'Name'){
      try
      {
        var exists = fs.statSync('./Src/' + res.Type + '/' + res.Name + '/' + res.Name + '.js');
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

  function finished(res){
    return function(){
      console.log('\033[36mFinished compiling \033[37m',res.Name,' \033[36mfor \033[37m',res.Environment);
    }
  }

  function commandCallback(res){
    var env = config.Tasks.Build.subtasks[res.SubTask];
    return function(){

      console.log((res.currentrule > 0 ? ('Finished task '+env[res.currentrule-1]) : ''));

      if(env[res.currentrule] === res.Environment){
        require('./Subtasks/'+res.SubTask+'/'+env[res.currentrule]).call({},res,finished(res));
      }
      else{
        require('./Subtasks/'+res.SubTask+'/'+env[res.currentrule]).call({},res,commandCallback(res));
      }
      res.currentrule += 1;
    }
  }

  function Command(res){
    console.log('\033[36mStarting to compile:\033[37m',res.Name,' \033[36mFor \033[37m',res.SubTask,' \033[36msubtask\033[37m');
    res.currentrule = 0;
    commandCallback(res).call();
  }


  return base.task('Build')
  .filter(Exists)
  .command(Command)
  .call();
}
