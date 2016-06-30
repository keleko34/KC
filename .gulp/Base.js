var gulp = require('gulp')
  , prompt = require('gulp-prompt');

var config = global.gulp.config;

module.exports = (function(){
  var _filter = function(){},
      _task = '',
      _commands,
      _commandKeys,
      _command = function(){},
      _editPrompts = function(){},
      _values = {},
      _gulp = gulp.src('*'),
      _prompts = {};

  function Base(){
    if(!_commandKeys){
      console.error('Task name: '+_task+' config does not exist, please create');
      return _gulp;
    }

    for(var i=0;i<_commandKeys.length;i++){
      var k = _commandKeys[i];
      if(_values[k] === undefined){
        _prompts[k] = {
          name:k
        },
        _promptKeys = Object.keys(_commands[k].prompt);

        for(var x=0;x<_promptKeys.length;x++){
          var p = _promptKeys[x];
          _prompts[k][p] = _commands[k].prompt[p];
        }

        function method(k){
          if(i !== (_commandKeys.length-1)){
            return function(res){
              _values[k] = res[k];
              _editPrompts(_values,k,_prompts);
              _filter(_values,k);
            }
          }
          else{
            return function(res){
              _values[k] = res[k];
              _command(_values,k);
            }
          }
        }
        _gulp = _gulp.pipe(prompt.prompt(_prompts[k],method(k)));
      }
    }

    return _gulp;
  }

  Base.task = function(v){
    if(v === undefined){
      return _task;
    }
    _task = (typeof v === 'string' && config.Tasks[v] !== undefined ? v : _task);
    if(_task.length > 0){
      _commands = config.Tasks[v].commands;
      _commandKeys = Object.keys(_commands);
    }
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

  Base.editPrompts = function(v){
    if(v === undefined){
      return _editPrompts;
    }
    _editPrompts = (typeof v === 'function' ? v : _editPrompts);
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
