define(['./__IncrementBtn/IncrementBtn'],function(CreateSlider__IncrementGroup__IncrementBtn){
  function CreateSlider__IncrementGroup()
  {
    var _value = 0
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _onChange = function(){}
      , _buttons = []
      , _min = 0
      , _max = 100
      , _disabled = false

    function Slider__IncrementGroup(node)
    {
      var _incrementGroup = node.querySelector('.Slider__IncrementGroup')
        , _btns = Slider__IncrementGroup.buttons()
        , _btn;

      if(!_incrementGroup)
      {
        _incrementGroup = node.appendChild(document.createElement('div'));
      }
      _incrementGroup.setAttribute('class','Slider__IncrementGroup Slider__IncrementGroup--'+Slider__IncrementGroup.direction());
      _incrementGroup.innerHTML = '';

      _btns.forEach(function(b,i){
        b.onChange = Slider__IncrementGroup.onChange();
        b.value = Slider__IncrementGroup.value();
        b.direction = Slider__IncrementGroup.direction()
        b.disabled = Slider__IncrementGroup.disabled()
        b.min = Slider__IncrementGroup.min()
        b.max = Slider__IncrementGroup.max()
          _btn = CreateSlider__IncrementGroup__IncrementBtn();

          Object.keys(b).forEach(d,function(dd,ii){
            if(_btn[ii] !== undefined)
            {
              _btn[ii](dd);
            }
          });
          _btn.call(_btn,_incrementGroup);
      });

    }

    Slider__IncrementGroup.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = (_directionEnum.indexOf(d) > -1 ? d : _direction);
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.onChange = function(c){
      if(c === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof c === 'function' ? c : _onChange);
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.buttons = function(n,b){
      if(n === undefined)
      {
        return _buttons;
      }
      if(b === undefined)
      {
        _buttons = (n.constructor === Array ? n : _buttons);
        return Slider__IncrementGroup;
      }
      if(b.constructor === Object && typeof n === 'string')
      {
        b.name = n;
        _buttons.push(btn);
      }
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__IncrementGroup;
    }

    Slider__IncrementGroup.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__IncrementGroup;
    }

    return Slider__IncrementGroup;
  }
  return CreateSlider__IncrementGroup;
});
