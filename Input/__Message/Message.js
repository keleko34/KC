define(function(){
  function CreateInput__Message()
  {
    var _active = false
      , _isOpen = false
      , _text = ''
      , _type = 'error'
      , _typeEnum = ['error','success','info']

    function Input__Message(node)
    {

    }

    Input__Message.active = function(v)
    {
      if(v === undefined)
      {
        return _active;
      }
      _active = !!v;
      return Input__Message;
    }

    Input__Message.isOpen = function(v)
    {
      if(v === undefined)
      {
        return _isOpen;
      }
      _isOpen = !!v;
      return Input__Message;
    }

    Input__Message.text = function(v)
    {
      if(v === undefined)
      {
        return _text;
      }
      _text = (typeof v === 'string' ? v : _text);
      return Input__Message;
    }

    Input__Message.type = function(v)
    {
      if(v === undefined)
      {
        return _type;
      }
      _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
      return Input__Message;
    }

    Input__Message.addType = function(v)
    {
      if(v !== undefined)
      {
        _typeEnum.push(v);
      }
    }

    return Input__Message;
  }
  return CreateInput__Message;
});
