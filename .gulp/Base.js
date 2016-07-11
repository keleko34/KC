/*****
 *   Base
 *   This files functionality is to be a base handler for prompts and cli inputs that get given to the task
 *   Created by Keleko34
 *****/

var gulp = require('gulp'),
    cli = require('commander').version('0.0.1'),
    prompt = require('gulp-prompt');

var config = global.gulp.config;

module.exports = (function(){

  /* These are the private variables [l(* u *)l] *Kirby* */
  var _filter = function(){},
      _task = '',
      _taskCommands = {},
      _taskCommandKeys = [],
      _currentTaskCommand = '',
      _command = function(){},
      _values = {},
      _gulp = gulp.src('*'),
      _prompts = {},

      /* Parses arguments into an array for sending to commander */
      _parseCli = function(c){
        var args = [];
        /* command acceptance */
        args.push((c.cmd.short ? c.cmd.short+', ' : '')+c.cmd.long + ' [value]');
        /* command help message */
        args.push((c.cmd.help ? c.cmd.help : c.prompt.message));
        return args;
      }

  /* runs the given command based on the name */
  function runCommand(commandName,options){
      /* set prompt options */
      _prompts[commandName] = {
        name:commandName,
        message: options.prompt.message,
        type: (options.prompt.type !== undefined ? options.prompt.type : 'input'),
      }

      /* if type is list set choices option for prompt */
      if(options.prompt.type === 'list'){
        _prompts[commandName].choices = (typeof options.prompt.choices === 'function' ? options.prompt.choices(_values) : options.prompt.choices);
      }

      /* Run gulp prompt command */
      _gulp = _gulp.pipe(prompt.prompt(_prompts[commandName],method(commandName,options)));
  }

  /* This method acts as a filter for which command to run next based on the action property */
  function toCommand(commandName,action){

    /* exit process on command action of 'exit' */
    if(action.toLowerCase() === 'exit'){
      console.error('Exiting process due to command; ',commandName);
      process.exit(1);
    }

    /* go to final task command with values upon seeing an 'end' action */
    else if(action.toLowerCase() === 'end'){
      _command(_values);
    }

    /* go the the next command specified in 'action' */
    else{
      _currentTaskCommand = action;
      if(_taskCommands[_currentTaskCommand] === undefined){
        console.error('No command exists by the name of ',_currentTaskCommand);
        process.exit(1);
      }
      runCommand(_currentTaskCommand,_taskCommands[_currentTaskCommand]);
    }
  }

  /* Main method that is ran whenever a value is to be set */
  function method(commandName, options, isCliSet){

    /* if being set from cli and type is list check that value is in choices */
    if(isCliSet && options.prompt.type === 'list'){
      return function(res){

        /* check to make sure that the entered cli is in fact in the choices list */
        if(typeof options.prompt.choices === 'function' ? options.prompt.choices().indexOf(res) > -1 : options.prompt.choices.indexOf(res) > -1){
          addValue(commandName, options, res, isCliSet);
        }
      }
    }
    return function(res){
      addValue(commandName, options, (isCliSet ? res : res[commandName]));
    }
  }

  function addValue(commandName,options,res,isCliSet){

    /* here we check if store was specified and if its an array we push the new value in */
    if(options.store && options.store === 'array'){
      if(_values[commandName] === undefined){
        _values[commandName] = [];
      }
      _values[commandName].push((typeof options.overwrite === 'function' ? options.overwrite(res) : res));
    }

    /* else we just set the value straight up */
    else{

      _values[commandName] = (typeof options.overwrite === 'function' ? options.overwrite(res) : res);
    }

    /* here we allow the task to filter the current values set and do something based on that */
    _filter(commandName,_values,function(action){
      if(action.toLowerCase() === 'exit'){
        toCommand(commandName,action);
      }
    });

    toCommand(commandName,(typeof options.action === 'function' ? options.action(res,_values) : options.action));
  }

  function Base(){

    /* Grab all the commands from the config */
    _taskCommands = config.Tasks[_task].commands;

    /* check if this task even exists in the config */
    if(_taskCommands === undefined){
      console.error('Task name: '+_task+' config does not exist, please create');
      return _gulp;
    }

    /* set current command keys for reading as array */
    _taskCommandKeys = Object.keys(_taskCommands);
    _currentTaskCommand = _taskCommandKeys[0];

    /* Loop through each command and read its properties */
    _taskCommandKeys.forEach(function(commandName,i){
      var options = _taskCommands[commandName];

      /* filter cmd entered values first */
      if(options.cmd !== undefined){
        cli = cli.option.apply(cli,_parseCli(options).concat(method(commandName, options,true)));
        cli.parse(process.argv);
      }
    });

    /* add helper for options method after reading all cli commands */
    cli.option('-o, --options','Displays helper for options',cli.help.bind(cli)).parse(process.argv);

    /* run first command in the list */
    runCommand(_currentTaskCommand,_taskCommands[_currentTaskCommand]);

    return _gulp;
  }

  Base.task = function(v){
    if(v === undefined){
      return _task;
    }
    _task = (typeof v === 'string' && config.Tasks[v] !== undefined ? v : _task);
    return Base;
  }

  Base.filter = function(v){
    if(v === undefined){
      return _filter;
    }
    _filter = (typeof v === 'function' ? v : _filter);
    return Base;
  }

  Base.command = function(v){
    if(v === undefined){
      return _command;
    }
    _command = (typeof v === 'function' ? v : _command);
    return Base;
  }

  Base.values = function(){
    return _values;
  }

  Base.gulp = function(v){
    if(v === undefined){
      return _gulp;
    }
    _gulp = v;
    return Base;
  }

  return Base;
}());
