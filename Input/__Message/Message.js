define(function(){
  function CreateInput__Message()
  {
    var _active = false
      , _isOpen = false
      , _text = ''
      , _type = 'error'
      , _typeEnum = ['error','success','info']
      , _positionType = 'hover'
      , _positionTypeEnum = ['hover','inline']
      , _closeOnClick = false

    function Input__Message(node)
    {
      var _message = node.querySelector('.Input__Message')
        , _field = node.querySelector('.Input__Field')
        , _helper = node.querySelector('.Input__Helper__Popup')
      if(!_message)
      {
        _message = node.appendChild(document.createElement('div'));
      }
      if(!_active)
      {
        node.removeChild(_message);
      }
      if(_type === 'hover')
      {
        if(node.offsetParent.innerHTML === node.parentNode.innerHTML && node.style.position === undefined)
        {
          node.style.position = 'relative';
        }
        _message.style.position = 'absolute';
        _message.style.top = _field.clientHeight+'px';
        if(_helper && _helper.style.position !== undefined)
        {
          _message.style.top = (_isOpen ? (_field.clientHeight+_helper.clientHeight) : _field.clientHeight)+'px';
        }
      }
      else
      {
        _message.style.position = '';
        _message.style.top = '';
      }
      _message.setAttribute('class','Input__Message Input__Message--'+_type+' Input__Message--'+(_isOpen ? 'open' : 'closed')+' Input__Message--'+(_positionType));
      _message.onclick = (_closeOnClick ? function(){_isOpen=false;Input__Helper__Popup.call({},node);} : function(){});
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

    Input__Message.closeOnClick = function(v)
    {
      if(v === undefined)
      {
        return _closeOnClick;
      }
      _closeOnClick = !!v;
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

    Input__Message.positionType = function(v)
    {
      if(v === undefined)
      {
        return _positionType;
      }
      _positionType = (_positionTypeEnum.indexOf(v) > -1 ? v : _positionType);
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
