var gulp = require('gulp'),
    cli = require('commander'),
    prompt = require('gulp-prompt');

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

  cli = cli.version('0.0.1')

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
        if(_commands[k].cmd){
          cli = cli.option.apply(cli,Base.parseCli(_commands[k]).concat(method(k,true)));
          cli.parse(process.argv);
        }

        for(var x=0;x<_promptKeys.length;x++){
          var p = _promptKeys[x];
          _prompts[k][p] = _commands[k].prompt[p];
        }

        function addValue(k,c,res){
          _values[k] = (c ? res : res[k]);
          _editPrompts(_values,k,_prompts);
          _filter(_values,k);
          if(Object.keys(_values).length === Object.keys(_commands).length){
            _command(_values,k);
          }
        }

        function method(k,c){
          if(c && _commands[k].prompt.type === 'list'){
            return function(res){
              if(_commands[k].prompt.choices.indexOf((c ? res : res[k])) > -1){
                addValue(k,c,res);
              }
            }
          }

          return function(res){
            addValue(k,c,res);
          }
        }
        if(!_values[k] || _values[k].length < 1){
          _gulp = _gulp.pipe(prompt.prompt(_prompts[k],method(k)));
        }
      }
    }
    cli.option('-o, --options','Displays helper for options',cli.help.bind(cli)).parse(process.argv);

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

  Base.parseCli = function(c){
    var args = [];
    /* command acceptance */
    args.push((c.cmd.short ? c.cmd.short+', ' : '')+c.cmd.long + ' [value]');
    /* command help message */
    args.push((c.cmd.help ? c.cmd.help : c.prompt.message));
    return args;
  }

  return Base;
}());
