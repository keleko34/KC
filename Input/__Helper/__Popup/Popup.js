define(function(){
  function CreateInput__Helper__Popup()
  {
    var _text = ''
      , _type = 'hover'
      , _typeEnum = ['hover','inline']
      , _active = false

    function Input__Helper__Popup(node)
    {
      var _popup = node.querySelector('.Input__Helper__Popup');
      if(!_popup)
      {
        _popup = node.appendChild(document.createElement('div'));
      }

      if(_type === 'hover')
      {
        if(node.offsetParent.innerHTML === node.parentNode.innerHTML && node.style.position === undefined)
        {
          node.style.position = 'relative';
        }
      }

    }

    return Input__Helper__Popup;
  }
  return CreateInput__Helper__Popup;
})
