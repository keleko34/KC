var gulp = require('gulp')
  , prompt = require('gulp-prompt');

var config = global.gulp.config,
    commands = config.Tasks.Create.commands,
    commandKeys = Object.keys(commands);

module.exports = (function(){
  var _filter = function(){},
      _command = function(){},
      _values = {},
      _gulp = gulp.src('*');

  function Base(){

    for(var i=0;i<commandKeys.length;i++){
      var k = commandKeys[i];
      if(_values[k] === undefined){
        var _prompt = {
          name:k
        },
        _promptKeys = Object.keys(commands[k].prompt);

        for(var x=0;x<_promptKeys.length;x++){
          var p = _promptKeys[x];
          _prompt[p] = commands[k].prompt[p];
        }

        function method(k){
          if(i !== (commandKeys.length-1)){
            return function(res){
              _values[k] = res[k];
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
        _gulp = _gulp.pipe(prompt.prompt(_prompt,method(k)));
      }
    }

    return _gulp;
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

  Base.gulp = function(){
    return _gulp;
  }

  return Base;
}());
