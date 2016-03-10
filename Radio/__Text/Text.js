define([],function(){
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
});
