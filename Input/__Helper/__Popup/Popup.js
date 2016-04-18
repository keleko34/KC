define(function(){
  function CreateInput__Helper__Popup()
  {
    var _text = ''
      , _type = 'hover'
      , _typeEnum = ['hover','inline']
      , _active = false
      , _isOpen = false
      , _closeOnClick = false

    function Input__Helper__Popup(node)
    {
      var _popup = node.querySelector('.Input__Helper__Popup')
        , _field = node.querySelector('.Input__Field')
        , _message = node.querySelector('.Input__Message')
      if(!_popup)
      {
        _popup = node.appendChild(document.createElement('div'));
      }
      if(!_active)
      {
        node.removeChild(_popup);
      }
      if(_type === 'hover')
      {
        if(node.offsetParent.innerHTML === node.parentNode.innerHTML && node.style.position === undefined)
        {
          node.style.position = 'relative';
        }
        _popup.style.position = 'absolute';
        _popup.style.top = _field.clientHeight+'px';
        if(_message && _message.style.position !== undefined)
        {
          _message.style.top = (_isOpen ? (_field.clientHeight+_popup.clientHeight) : _field.clientHeight)+'px';
        }
      }
      else
      {
        _popup.style.position = '';
        _popup.style.top = '';
      }
      _popup.setAttribute('class','Input__Helper__Popup Input__Helper__Popup--'+_type+' Input__Helper__Popup--'+(_isOpen ? 'open' : 'closed'));
      _popup.onclick = (_closeOnClick ? function(){_isOpen=false;Input__Helper__Popup.call({},node);} : function(){});
    }

    Input__Helper__Popup.text = function(v)
    {
      if(v === undefined)
      {
        return _text;
      }
      _text = (typeof v === 'string' ? v : _text);
      return Input__Helper__Popup;
    }

    Input__Helper__Popup.type = function(v)
    {
      if(v === undefined)
      {
        return _type;
      }
      _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
      return Input__Helper__Popup;
    }

    Input__Helper__Popup.active = function(v)
    {
      if(v === undefined)
      {
        return _active;
      }
      _active = !!v;
      return Input__Helper__Popup;
    }

    Input__Helper__Popup.isOpen = function(v)
    {
      if(v === undefined)
      {
        return _isOpen;
      }
      _isOpen = !!v;
      return Input__Helper__Popup;
    }

    Input__Helper__Popup.closeOnClick = function(v)
    {
      if(v === undefined)
      {
        return _closeOnClick;
      }
      _closeOnClick = !!v;
      return Input__Helper__Popup;
    }


    return Input__Helper__Popup;
  }
  return CreateInput__Helper__Popup;
})
