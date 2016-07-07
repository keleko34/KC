/* Gulp Modules */
var gulp = require('gulp'),
    env = [
      {name:'dev',task:require('./Subtasks/Dev')},
      {name:'qa',task:require('./Subtasks/Qa')},
      {name:'stage',task:require('./Subtasks/Stage')},
      {name:'prod',task:require('./Subtasks/Prod')},
    ],
    base = require('./../../Base'),
    fs = require('fs'),
    currentEnv = 0;

var config = global.gulp.config;

module.exports = function(){

  function listComponents(res,key,prompts){
    if(key === 'Type'){
      prompts.Name.choices = fs.readdirSync('./' + config[res.Type].base)
      .filter(function(k,i){
        return k !== '.gitkeep';
      });
    }
  }

  function finished(res){
    return function(){
      console.log('\033[36mFinished compiling \033[37m',res.Name,' \033[36mfor \033[37m',res.Environment);
    }
  }

  function filterEnv(e){
    return env.filter(function(k,i){
      return (k.name === e);
    });
  }

  function commandCallback(res){
    return function(){
      currentEnv += 1;
      if(env[currentEnv].name === res.Environment){
        filterEnv(env[currentEnv].name)[0].task(res,finished(res));
      }
      else{
        filterEnv(env[currentEnv].name)[0].task(res,commandCallback(res));
      }
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
    return filterEnv(env[currentEnv].name)[0].task(res,(env[currentEnv].name === res.Environment ? finished(res) : commandCallback(res)));
  }


  return base.task('Build')
  .editPrompts(listComponents)
  .filter(Exists)
  .command(Command)
  .call();
}
