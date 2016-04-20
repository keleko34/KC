define(function(){
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
});
