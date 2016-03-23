define(['./__Popup/Popup'],function(CreateInput__Helper__Popup){
  function CreateInput__Helper()
  {
    var _active = false
      , _onClick = function(){}
      , _helperText = 'i'
      , _disabled = false
      , _popupDisabled = false
      , _popupType = 'hover'
      , _popupTypeEnum = ['hover','inline']
      , _popupText = ''

    function Input__Helper(node)
    {
      var _helper = node.querySelector('.Input__Helper')
        , _onClkEv = function()
          {
            if(!_disabled)
            {
              _onClick(Input__Helper);
              if(!_popupDisabled)
              {
                _popup.type(_popupType)
                .text(_popupText)
                .active(_active);
                _popup.call({},_helper);
              }
            }
          }

      if(!_helper)
      {
        _helper = node.appendChild(document.createElement('div'));
      }
      _helper.setAttribute('class','Input__Helper Input__Helper--'+(_active ? 'visible' : 'hidden'));
      _helper.innerHTML = _helperText;
      _helper.onclick = _onClkEv;
    }

    Input__Helper.active = function(v)
    {
      if(v === undefined)
      {
        return _active;
      }
      _active = !!v;
      return Input__Helper;
    }

    Input__Helper.disabled = function(v)
    {
      if(v === undefined)
      {
        return _disabled;
      }
      _disabled = !!v;
      return Input__Helper;
    }

    Input__Helper.onClick = function(v)
    {
      if(v === undefined)
      {
        return _onClick;
      }
      _onClick = (typeof v === 'function' ? v : _onClick);
      return Input__Helper;
    }

    Input__Helper.helperText = function(v)
    {
      if(v === undefined)
      {
        return _helperText;
      }
      _helperText = (typeof v === 'string' ? v : _helperText);
      return Input__Helper;
    }

    Input__Helper.popupType = function(v)
    {
      if(v === undefined)
      {
        return _popupType;
      }
      _popupType = (_popupTypeEnum.indexOf(v) > -1 ? v : _popupType);
      return Input__Helper;
    }

    Input__Helper.popupDisabled = function(v)
    {
      if(v === undefined)
      {
        return _popupDisabled;
      }
      _popupDisabled = !!v;
      return Input__Helper;
    }

    Input__Helper.popupText = function(v)
    {
      if(v === undefined)
      {
        return _popupText;
      }
      _popupText = (typeof v === 'string' ? v : _popupText);
      return Input__Helper;
    }

    Input__Helper.popup = function(v)
    {
      if(v === undefined)
      {
        return _popup;
      }
      _popup = (_popupTypeEnum.indexOf(v) > -1 ? v : _popupType);
      return Input__Helper;
    }

    return Input__Helper;
  }
  return CreateInput__Helper;
});
