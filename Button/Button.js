/* BUILD SECTION */
/* END BUILD SECTION */

define(['./__Input/Input'],function(CreateButton__Input){
  function CreateButton(){

    var _text = ''
      , _toggleText = ['','']
      , _onClick = function(){}
      , _type = 'click'
      , _typeEnum = ['click','toggle','text']
      , _disabled = false
      , _btnInput = CreateButton__Input()

    function Button(node)
    {
      node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
      if(!node)
      {
        console.error("you have passed an invalid node into Button: ",node);
        return;
      }

      var _button = node.querySelector('.Button');
      if(!_button)
      {
        _button = node.appendChild(document.createElement('div'));
      }
      _button.setAttribute('class','Button Button--type'+Button.type()+' Button--'+(Button.disabled() ? 'disabled' : ''));

      Button.btnInput()
      .type(Button.type())
      .text(_toggleText)
      .text(Button.text())
      .onClick(Button.onClick())
      .disabled(Button.disabled())
      .call(Button.btnInput(),_button);
    }

    Button.text = function(t){
      if(t === undefined)
      {
        return _text;
      }
      if(t.constructor === Array)
      {
        _toggleText = t;
        return Button;
      }
      _text = (typeof t === 'string' ? t : _text);
      return Button;
    }

    Button.type = function(t){
      if(t === undefined)
      {
        return _type;
      }
      _type = (_typeEnum.indexOf(t) > -1 ? t : _type);
      return Button;
    }

    Button.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Button;
    }

    Button.onClick = function(c){
      if(c === undefined)
      {
        return _onClick;
      }
      _onClick = (typeof c === 'function' ? c : _onClick);
      return Button;
    }

    Button.btnInput = function(b){
      if(b === undefined)
      {
        return _btnInput;
      }
      _btnInput = (b.toString() === CreateBtnInput().toString() ? b : _btnInput);
      return Button;
    }

    return Button;
  }
  if (typeof define === "function" && define.amd)
  {
    define('CreateButton',CreateButton);
  }
  else if (typeof module === "object" && module.exports)
  {
    module.exports = CreateButton;
  }
  return CreateButton;
});
