define(function(){
  function CreateInput__Title()
  {
    var _active = false
      , _text = ''
      , _position = 'top'
      , _positionEnum = ['top','left']

    function Input__Title(node)
    {
      var _title = node.querySelector('.Input__Title');
      if(!_title)
      {
        _title = node.appendChild(document.createElement('div'));
      }
    }

    Input__Title.active = function(v)
    {
      if(v == undefined)
      {
        return _active;
      }
      _active = !!v;
      return Input__Title;
    }

    Input__Title.text = function(v)
    {
      if(v == undefined)
      {
        return _text;
      }
      _text = (typeof v === 'string' ? v : _text);
      return Input__Title;
    }

    Input__Title.position = function(v)
    {
      if(v == undefined)
      {
        return _position;
      }
      _position = (_positionEnum.indexOf(v) > -1 ? v : _position);
      return Input__Title;
    }

    return Input__Title;
  }
  return CreateInput__Title;
});
