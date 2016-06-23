define([],function(){
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
});
