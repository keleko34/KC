define(['./__Field/Field'],function(CreateInput__Field){
	function CreateInput(){

      /* BUILD SECTION */
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
})
