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

          Input.Field = function(v)
          {
            if(v === undefined)
            {
              return _Field;
            }
            _Field = (v.toString() === CreateInput__Field().toString() ? v : _Field);
          }


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
