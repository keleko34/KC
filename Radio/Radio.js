/* BUILD SECTION */
/* END BUILD SECTION */

define(['./__Input/Input','./__Text/Text'],function(CreateRadio__Input,CreateRadio__Text){
	function CreateRadio(){

      var _value = false
      , _disabled = false
      , _text = ''
      , _onChange = function(){}
      , _input = CreateRadio__Input()
      , _title = CreateRadio__Text()

		function Radio(node){
			node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
			if(!node)
			{
				console.error('you have passed an invalid node into Radio: ',node);
				return;
			}

          var _radio = node.querySelector('.Radio');
          if(!_radio)
          {
            _radio = node.appendChild(document.createElement('div'));
          }
          _radio.setAttribute('class','Radio Radio--'+(Radio.disabled() ? 'disabled' : 'enabled'));

          Radio.input()
          .value(Radio.value())
          .disabled(Radio.disabled())
          .onChange(Radio.onChange())
          .call(Radio.input(),_radio);

          Radio.title()
          .text(Radio.text())
          .call(Radio.title(),_radio);

        }

      Radio.value = function(v){
        if(v === undefined)
        {
          return _value;
        }
        _value = !!v;
        return Radio;
      }

      Radio.disabled = function(d){
        if(d === undefined)
        {
          return _disabled;
        }
        _disabled = !!d;
        return Radio;
      }

      Radio.onChange = function(c){
        if(c === undefined)
        {
          return _onChange;
        }
        _onChange = (typeof c === 'function' ? c : _onChange);
        return Radio;
      }

      Radio.text = function(t)
      {
        if(t === undefined)
        {
          return _text;
        }
        _text = (typeof t === 'string' ? t : _text);
        return Radio;
      }

      Radio.input = function(t)
      {
        if(t === undefined)
        {
          return _input;
        }
        _input = (t.toString() === CreateRadio__Input().toString() ? t : _input);
        return Radio;
      }

      Radio.title = function(t)
      {
        if(t === undefined)
        {
          return _title;
        }
        _title = (t.toString() === CreateRadio__Title().toString() ? t : _title);
        return Radio;
      }
      return Radio;
	}
    if (typeof define === "function" && define.amd)
    {
      define('CreateRadio',CreateRadio);
    }
    else if (typeof module === "object" && module.exports)
    {
      module.exports = CreateRadio;
    }
	return CreateRadio;
});
