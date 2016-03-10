define(function(){
  function CreateButton__Input__Content(){

    var _text = ''

    function Button__Input__Content(node)
    {

      var _content = node.querySelector('.Button__Input__Content');
      if(!_content)
      {
        _content = node.appendChild(document.createElement('div'));
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
});
