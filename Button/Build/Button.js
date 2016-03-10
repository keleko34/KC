/* BUILD SECTION */
var CreateButton__Input__Content = (function(){
  function CreateButton__Input__Content(){

    var _text = ''

    function Button__Input__Content(node)
    {

      var _content = node.querySelector('.Button__Input__Content');
      if(!_content)
      {
        _content = node.appendChild(document.createElement('span'));
      }
      _content.setAttribute('class','Button__Input__Content');
      _content.innerHTML = Button__Input__Content.text();
    }

    Button__Input__Content.text = function(t)
    {
      if(t === undefined)
      {
        return _text;
      }
      _text = (typeof t === 'string' ? t : _text);
      return Button__Input__Content;
    }

    return Button__Input__Content;
  }
  return CreateButton__Input__Content;
}());;

var CreateButton__Input = (function(){
  function CreateButton__Input(){

    var _text = ''
      , _toggleText = ['','']
      , _content = CreateButton__Input__Content()
      , _toggle = 0
      , _type = 'click'
      , _typeEnum = ['click','toggle','text']
      , _onClick = function(){}
      , _disabled = false
      , _link = ''

    function Button__Input(node)
    {

      var _btninput = node.querySelector('.Button__Input');
      if(!_btninput)
      {
        _btninput = node.appendChild(document.createElement('a'));
      }

      if(Button__Input.type() === 'toggle')
      {
        Button__Input.text(_toggleText[Button__Input.toggle()]);
      }

      var onClick = function()
      {
        if(!Button__Input.disabled())
        {
          if(Button__Input.type() === 'toggle')
          {
            Button__Input.toggle((Button__Input.toggle() ? 1 : 0));
          }
          Button__Input.onClick()(Button__Input)
          .call(Button__Input,_btninput);
        }
      }

      _btninput.setAttribute('class','Button__Input Button__Input--type'+Button__Input.type()+' Button__Input--'+(Button__Input.toggle() ? 'toggled' : 'untoggled'));
      if(Button__Input.link().length > 0)
      {
        _btninput.setAttribute('href',Button__Input.link());
      }
      else
      {
        _btninput.removeAttribute('href');
      }

      _btninput.onClick = onClick;

      Button__Input.content()
      .text(Button__Input.text())
      .call(Button__Input,_btninput);
    }

    Button__Input.text = function(t)
    {
      if(t === undefined)
      {
        return _text;
      }
      if(t.constructor === Array)
      {
        _toggleText = t;
        return Button__Input;
      }
      _text = (typeof t === 'string' ? t : _text);
      return Button__Input;
    }

    Button__Input.content = function(c)
    {
      if(c === undefined)
      {
        return _content;
      }
      _content = (c.toString() === CreateButton__Input__Content().toString() ? c : _text);
      return Button__Input;
    }

    Button__Input.link = function(l)
    {
      if(l === undefined)
      {
        return _link;
      }
      _link = (typeof l === 'string' ? l : _link);
      return Button__Input;
    }

    Button__Input.type = function(t)
    {
      if(t === undefined)
      {
        return _type;
      }
      _type = (_typeEnum.indexOf(t) > -1 ? t : _type);
      return Button__Input;
    }

    Button__Input.toggle = function(t)
    {
      if(t === undefined)
      {
        return _toggle;
      }
      _toggle = ((typeof t === 'number' && t < 2) ? t : _toggle);
      return Button__Input;
    }

    Button__Input.onClick = function(c)
    {
      if(c === undefined)
      {
        return _onClick;
      }
      _onClick = (typeof c === 'function' ? c : _onClick);
      return Button__Input;
    }

    Button__Input.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Button__Input;
    }

    return Button__Input;
  }
  return CreateButton__Input;
}());;




/* END BUILD SECTION */

var CreateButton = (function(){
  function CreateButton(){

    var _text = ''
      , _toggleText = ['','']
      , _onClick = function(){}
      , _type = 'click'
      , _typeEnum = ['click','toggle','text']
      , _disabled = false
      , _btnInput = CreateButton__Input()
      , _link = ''

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
      _button.setAttribute('class','Button Button--type'+Button.type()+' Button--'+(Button.disabled() ? 'disabled' : 'enabled'));

      Button.btnInput()
      .type(Button.type())
      .text(_toggleText)
      .text(Button.text())
      .onClick(Button.onClick())
      .disabled(Button.disabled())
      .link(Button.link())
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

    Button.link = function(l){
      if(l === undefined)
      {
        return _link;
      }
      _link = (typeof l === 'string' ? l : _link);
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
}());
