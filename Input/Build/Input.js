var CreateInput = (function(){
	function CreateInput(){

      /* BUILD SECTION */
      var CreateInput__Field = (function(){
  function CreateInput__Field()
  {
    var _value = ''
      , _type = 'text'
      , _typeEnum = ['text','password','number']
      , _disabled = false
      , _title = ''
      , _placeholder = ''
      , _onInput = function(){}
      , _onChange = function(){}
      , _onFocus = function(){}
      , _onBlur = function(){}
      , _onEnter = function(){}
      , _onTab = function(){}
      , _focused = false
      , _error = false
      , _valid = true

    function Input__Field(node)
    {
      var _field = node.querySelector('.Input__Field')
        , _onInpEv = function()
          {
            if(!_disabled && this.value !== _value)
            {
              _value = this.value;
              _onInput(Input__Field);
            }
          }
        , _onChgEv = function()
          {
            if(!_disabled)
            {
              _value = this.value;
              _onChange(Input__Field);
            }
          }
        , _onFcsEv = function()
          {
            _focused = true;
            _onFocus(Input__Field);
          }
        , _onBlEv = function()
          {
            _focused = false;
            _onBlur(Input__Field);
          }
        , _keyEv = function(e)
          {
            var keyCode = e.which || e.keyCode;
            if(keyCode === 0 || keyCode === 229)
            {
              keyCode = this.value.charCodeAt(this.value.length-1);
            }
            if(keyCode === 13)
            {
              _onEnter(Input__Field,_field);
            }
            else if(keyCode === 9)
            {
              _onTab(Input__Field,_field);
            }
          }

      if(!_field)
      {
        _field = node.appendChild(document.createElement('input'));
      }

      _field.setAttribute('class','Input__Field Input__Field--'+_type);
      _field.setAttribute('type',_type);
      _field.setAttribute('title',_title);
      _field.setAttribute('placeholder',_placeholder);
      if(_disabled)
      {
        _field.setAttribute('disabled','true');
      }
      else
      {
        _field.removeAttribute('disabled');
      }

      if(_focused)
      {
        _field.focus();
      }

      _field.value = _value;
      _field.oninput = _onInpEv;
      _field.onchange = _onChgEv;
      _field.onfocus = _onFcsEv;
      _field.onBlur = _onBlEv;
      _field.onkeyup = _keyEv;
      _field.onkeypress = function(e){
        var keyCode = e.which || e.keyCode;
            if(keyCode === 0 || keyCode === 229)
            {
              keyCode = this.value.charCodeAt(this.value.length-1);
            }
            if(keyCode === 13 || keyCode === 9)
            {
              return false;
            }
      }
    }

    Input__Field.value = function(v)
    {
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'string' ? v : _value);
      return Input__Field;
    }

    Input__Field.type = function(v)
    {
      if(v === undefined)
      {
        return _type;
      }
      _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
      return Input__Field;
    }

    Input__Field.disabled = function(v)
    {
      if(v === undefined)
      {
        return _disabled;
      }
      _disabled = !!v;
      return Input__Field;
    }

    Input__Field.title = function(v)
    {
      if(v === undefined)
      {
        return _title;
      }
      _title = (typeof v === 'string' ? v : _title);
      return Input__Field;
    }

    Input__Field.placeholder = function(v)
    {
      if(v === undefined)
      {
        return _placeholder;
      }
      _placeholder = (typeof v === 'string' ? v : _placeholder);
      return Input__Field;
    }

    Input__Field.onInput = function(v)
    {
      if(v === undefined)
      {
        return _onInput;
      }
      _onInput = (typeof v === 'function' ? v : _onInput);
      return Input__Field;
    }

    Input__Field.onChange = function(v)
    {
      if(v === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof v === 'function' ? v : _onChange);
      return Input__Field;
    }

    Input__Field.onFocus = function(v)
    {
      if(v === undefined)
      {
        return _onFocus;
      }
      _onFocus = (typeof v === 'function' ? v : _onFocus);
      return Input__Field;
    }

    Input__Field.onBlur = function(v)
    {
      if(v === undefined)
      {
        return _onBlur;
      }
      _onBlur = (typeof v === 'function' ? v : _onBlur);
      return Input__Field;
    }

    Input__Field.onEnter = function(v)
    {
      if(v === undefined)
      {
        return _onEnter;
      }
      _onEnter = (typeof v === 'function' ? v : _onEnter);
      return Input__Field;
    }

    Input__Field.onTab = function(v)
    {
      if(v === undefined)
      {
        return _onTab;
      }
      _onTab = (typeof v === 'function' ? v : _onTab);
      return Input__Field;
    }

    Input__Field.onBlur = function(v)
    {
      if(v === undefined)
      {
        return _onBlur;
      }
      _onBlur = (typeof v === 'function' ? v : _onBlur);
      return Input__Field;
    }

    Input__Field.focused = function(v)
    {
      if(v === undefined)
      {
        return _focused;
      }
      _focused = !!v;
      return Input__Field;
    }

    Input__Field.error = function(v)
    {
      if(v === undefined)
      {
        return _error;
      }
      _error = !!v;
      return Input__Field;
    }

    Input__Field.valid = function(v)
    {
      if(v === undefined)
      {
        return _valid;
      }
      _valid = !!v;
      return Input__Field;
    }

    return Input__Field;
  }
  return CreateInput__Field;
}());;




      /* END BUILD SECTION */

        var _value = ''
          , _Field = CreateInput__Field()
          , _type = 'text'
          , _typeEnum = ['text','password','number']
          , _disabled = false
          , _title = ''
          , _placeholder = ''
          , _onInput = function(){}
          , _onChange = function(){}
          , _onFocus = function(){}
          , _focused = false
          , _error = false
          , _validation = function(){}
          , _valid = true
          , _required = false


		function Input(node){
          node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
          if(!node)
          {
              console.error('you have passed an invalid node into Input: ',node);
              console.error('stack: ',new Error().stack);
              return;
          }

          var _input = node.querySelector('.Input');
          if(!_input)
          {
            _input = node.appendChild(document.createElement('div'));
          }
          _input.setAttribute('class','Input Input--'+(_disabled ? 'disabled' : 'enabled')+' Input--'+(_valid ? 'valid' : 'invalid')+' Input--'+(_focused ? 'focused' : 'blured')+' Input--'+_type);

          _Field.type(_type)
          .disabled(_disabled)
          .title(_title)
          .placeholder(_placeholder)
          .onInput(function(f){
            _value = f.value();
            _onInput(f);
            Input.call(f,node);
          })
          .onChange(function(f){
            _value = f.value();
            _validation(f);
            _onChange(f);
            if(_required)
            {
              if(_valid && _value.length < 1)
              {
                _valid = false;
              }
            }
            Input.call(f,node);
          })
          .onFocus(function(f){
            _focused = true;
            _onFocus(f);
          })
          .onBlur(function(f){
            _focused = false;
            _onBlur(f);
          })
          .focused(_focused)
          .value(_value)
          .error(_error)
          .valid(_valid)
          .disabled(_disabled);

          _Field.call(Input,_input);
		}

        Input.value = function(v)
        {
          if(v === undefined)
          {
            return _value;
          }
          _value = (typeof v === 'string' ? v : _value);
          return Input;
        }

        Input.Field = function(v)
        {
          if(v === undefined)
          {
            return _Field;
          }
          _Field = (v.toString() === CreateInput__Field().toString() ? v : _Field);
          return Input;
        }

        Input.type = function(v)
        {
          if(v === undefined)
          {
            return _type;
          }
          _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
          return Input;
        }

        Input.disabled = function(v)
        {
          if(v === undefined)
          {
            return _disabled;
          }
          _disabled = !!v;
          return Input;
        }

        Input.title = function(v)
        {
          if(v === undefined)
          {
            return _title;
          }
          _title = (typeof v === 'string' ? v : _title);
          return Input;
        }

        Input.placeholder = function(v)
        {
          if(v === undefined)
          {
            return _placeholder;
          }
          _placeholder = (typeof v === 'string' ? v : _placeholder);
          return Input;
        }

        Input.onInput = function(v)
        {
          if(v === undefined)
          {
            return _onInput;
          }
          _onInput = (typeof v === 'function' ? v : _onInput);
          return Input;
        }

        Input.onChange = function(v)
        {
          if(v === undefined)
          {
            return _onChange;
          }
          _onChange = (typeof v === 'function' ? v : _onChange);
          return Input;
        }

        Input.onFocus = function(v)
        {
          if(v === undefined)
          {
            return _onFocus;
          }
          _onFocus = (typeof v === 'function' ? v : _onFocus);
          return Input;
        }

        Input.focused = function(v)
        {
          if(v === undefined)
          {
            return _focused;
          }
          _focused = !!v;
          return Input;
        }

        Input.error = function(v)
        {
          if(v === undefined)
          {
            return _error;
          }
          _error = !!v;
          return Input;
        }

        Input.validation = function(v)
        {
          if(v === undefined)
          {
            return _validation;
          }
          _validation = (typeof v === 'function' ? v : _validation);
          return Input;
        }

        Input.valid = function(v)
        {
          if(v === undefined)
          {
            return _valid;
          }
          _valid = !!v;
          return Input;
        }

        Input.required = function(v)
        {
          if(v === undefined)
          {
            return _required;
          }
          _required = !!v;
          return Input;
        }


		return Input;
	}
    if (typeof define === "function" && define.amd)
    {
      define('CreateInput',CreateInput);
    }
    else if (typeof module === "object" && module.exports)
    {
      module.exports = CreateInput;
    }
	return CreateInput;
}())
