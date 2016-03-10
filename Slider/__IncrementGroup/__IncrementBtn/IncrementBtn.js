define([],function(){
  function CreateSlider__IncrementGroup__IncrementBtn()
  {
    var _value = 0
      , _title = ''
      , _text = ''
      , _increment = 'up'
      , _incrementEnum = ['up','down']
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _incrementStep = 1
      , _onChange = function(v){}
      , _min = 0
      , _max = 100
      , _disabled = false

    function Slider__IncrementGroup__IncrementBtn(node)
    {
      var _IncrementBtn = node.querySelector('.Slider__IncrementGroup__IncrementBtn--'+Slider__IncrementGroup__IncrementBtn.title())
        , _onClick = function(){
          if(!Slider__IncrementGroup__IncrementBtn.disabled()){
            var incrementStep = Slider__IncrementGroup__IncrementBtn.incrementStep()
              , newValue
            if(typeof incrementStep === 'function')
            {
              newValue = incrementStep(Slider__IncrementGroup__IncrementBtn.value());
            }
            else
            {
              newValue = (Slider__IncrementGroup__IncrementBtn.increment() === 'up'?(Slider__IncrementGroup__IncrementBtn.value()+incrementStep):(Slider__IncrementGroup__IncrementBtn.value()-incrementStep));
            }
            if(newValue > Slider__IncrementGroup__IncrementBtn.max())
            {
              newValue = Slider__IncrementGroup__IncrementBtn.max();
            }
            else if(newValue < Slider__IncrementGroup__IncrementBtn.min())
            {
              newValue = Slider__IncrementGroup__IncrementBtn.min()
            }
            Slider__IncrementGroup__IncrementBtn.value(newValue);
            Slider__IncrementGroup__IncrementBtn.onChange().call({},Slider__IncrementGroup__IncrementBtn);
          }
        }
      if(!_IncrementBtn)
      {
        _IncrementBtn = node.appendChild(document.createElement('div'));
      }
      _IncrementBtn.setAttribute('class','Slider__IncrementGroup__IncrementBtn Slider__IncrementGroup__IncrementBtn--'+Slider__IncrementGroup__IncrementBtn.increment()+' Slider__IncrementGroup__IncrementBtn--'+Slider__IncrementGroup__IncrementBtn.direction()+' Slider__IncrementGroup__IncrementBtn--'+Slider__IncrementGroup__IncrementBtn.title());

      _IncrementBtn.onclick = _onClick;
      _IncrementBtn.innerHTML = Slider__IncrementGroup__IncrementBtn.text();
      _IncrementBtn.setAttribute('title',Slider__IncrementGroup__IncrementBtn.title());
    }

    Slider__IncrementGroup__IncrementBtn.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.title = function(n){
      if(n === undefined)
      {
        return _title;
      }
      _title = (typeof n === 'string' ? n : _title);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.text = function(t){
      if(t === undefined)
      {
        return _text;
      }
      _text = (typeof t === 'string' ? t : _text);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.increment = function(i){
      if(i === undefined)
      {
        return _increment;
      }
      _increment = (_incrementEnum.indexOf(i) > -1 ? i : _increment);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = (_directionEnum.indexOf(d) > -1 ? d : _direction);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.incrementStep = function(s){
      if(s === undefined)
      {
        return _incrementStep;
      }
      _incrementStep = ((typeof s === 'function' || typeof s === 'number') ? s : _incrementStep);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.onChange = function(c){
      if(c === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof c === 'function' ? c : _onChange);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__IncrementGroup__IncrementBtn;
    }

    Slider__IncrementGroup__IncrementBtn.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__IncrementGroup__IncrementBtn;
    }

    return Slider__IncrementGroup__IncrementBtn;
  }
  return CreateSlider__IncrementGroup__IncrementBtn;
});
