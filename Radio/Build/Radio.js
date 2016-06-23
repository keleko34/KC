var CreateRadio = (function(){
	function CreateRadio(){

      /* BUILD SECTION */
      var CreateRadio__Text = (function(){
  function CreateRadio__Text()
  {
    var _text = '';

    function Radio__Text(node)
    {
      var _textNode = node.querySelector('.Radio__Text');
      if(!_textNode)
      {
        _textNode = node.appendChild(document.createElement('div'));
      }

      _textNode.setAttribute('class','Radio__Text');
      _textNode.innerHTML = Radio__Text.text();
    }

    Radio__Text.text = function(t)
    {
      if(t === undefined)
      {
        return _text;
      }
      _text = (typeof t === 'string' ? t : _text);
      return Radio__Text;
    }

    return Radio__Text;
  }
  return CreateRadio__Text;
}());;

      var CreateRadio__Input = (function(){
  function CreateRadio__Input()
  {
    var _value = false
      , _disabled = false
      , _onChange = function(){};

    function Radio__Input(node)
    {
      var _input = node.querySelector('.Radio__Input');
      if(!_input)
      {
        _input = node.appendChild(document.createElement('div'));
        _input.appendChild(document.createElement('div'))
      }

      var _onClick = function()
      {
        if(!Radio__Input.disabled()){
          Radio__Input.value(!Radio__Input.value());
          Radio__Input.onChange()(Radio__Input);
          Radio__Input.call(Radio__Input,node);
        }
      }

      if(!Radio__Input.value())
      {
        _input.querySelector('div').style.display = 'none';
      }
      else
      {
        _input.querySelector('div').style.display = '';
      }

      _input.setAttribute('class','Radio__Input Radio__Input--'+(Radio__Input.value() ? 'checked' : 'unchecked'));
      _input.onclick = _onClick;
    }

    Radio__Input.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = !!v;
      return Radio__Input;
    }

    Radio__Input.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Radio__Input;
    }

    Radio__Input.onChange = function(c){
      if(c === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof c === 'function' ? c : _onChange);
      return Radio__Input;
    }

    return Radio__Input;
  }
  return CreateRadio__Input;
}());;




      /* END BUILD SECTION */

      var _value = false
      , _disabled = false
      , _text = ''
      , _onChange = function(){}
      , _extend = function(){}
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

          Radio.extend().call(Radio,_radio);

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

      Radio.extend = function(c){
        if(c === undefined)
        {
          return _extend;
        }
        _extend = (typeof c === 'function' ? c : _extend);
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
}());
