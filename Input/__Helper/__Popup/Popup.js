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
    }

    return Input__Helper__Popup;
  }
  return CreateInput__Helper__Popup;
})
