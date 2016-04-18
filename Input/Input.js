define(['./__Field/Field','./__Helper/Helper','./__Message/Message','./__Title/Title'],function(CreateInput__Field,CreateInput__Helper,CreateInput__Message,CreateInput__Title){
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

          , _Helper = CreateInput__Helper()
          , _hasHelper = false
          , _helperOnClick = function(){}
          , _helperText = 'i'
          , _helperPopup = true
          , _helperPopupType = 'hover'
          , _helperPopupTypeEnum = ['hover','inline']
          , _helperPopupText = ''
          , _helperPopupCloseOnClick = false

          , _Title = CreateInput__Title()
          , _hasTitle = false
          , _titlePosition = 'top'

          , _Message = CreateInput__Message()
          , _hasMessage = false
          , _message = ''
          , _isMessageOpen = false
          , _messageType = 'error'
          , _messagePositionType = 'hover'
          , _messageCloseOnClick = false


		function Input(node){
          node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
          if(!node)
          {
              console.error('you have passed an invalid node into Input: ',node);
              console.error('stack: ',new Error().stack);
              return;
          }
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

        Input.Helper = function(v)
        {
          if(v === undefined)
          {
            return _Helper;
          }
          _Helper = (v.toString() === CreateInput__Helper().toString() ? v : _Helper);
          return Input;
        }

        Input.hasHelper = function(v)
        {
          if(v === undefined)
          {
            return _hasHelper;
          }
          _hasHelper = !!v;
          return Input
        }

        Input.helperOnClick = function(v)
        {
          if(v === undefined)
          {
            return _helperOnClick;
          }
          _helperOnClick = (typeof v === 'function' ? v : _helperOnClick);
          return Input
        }

        Input.helperText = function(v)
        {
          if(v === undefined)
          {
            return _helperText;
          }
          _helperText = (typeof v === 'string' ? v : _helperText);
          return Input;
        }

        Input.helperPopup = function(v)
        {
          if(v === undefined)
          {
            return _helperPopup;
          }
          _helperPopup = !!v;
          return Input
        }

        Input.helperPopupType = function(v)
        {
          if(v === undefined)
          {
            return _helperPopupType;
          }
          _helperPopupType = (_helperPopupTypeEnum.indexOf(v) > -1 ? v : _helperPopupType);
          return Input;
        }

        Input.helperPopupText = function(v)
        {
          if(v === undefined)
          {
            return _helperPopupText;
          }
          _helperPopupText = (typeof v === 'string' ? v : _helperPopupText);
          return Input;
        }

        Input.helperPopupCloseOnClick = function(v)
        {
          if(v === undefined)
          {
            return _helperPopupCloseOnClick;
          }
          _helperPopupCloseOnClick = !!v;
          return Input
        }

        Input.Title = function(v)
        {
          if(v === undefined)
          {
            return _Title;
          }
          _Title = (v.toString() === CreateInput__Title().toString() ? v : _Title);
          return Input;
        }

        Input.hasTitle = function(v)
        {
          if(v === undefined)
          {
            return _hasTitle;
          }
          _hasTitle = !!v;
          return Input
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
