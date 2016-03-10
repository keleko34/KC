define(['./__Tick/Tick'],function(CreateSlider__TickGroup__Tick){
  function CreateSlider__TickGroup()
  {
    var _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _min = 0
      , _max = 100
      , _value = 0
      , _tickStep = 1
      , _align = 'center'
      , _alignEnum = ['left','center','right']
      , _ticks = 0
      , _tickTextOverload = function(v){return v}
      , _disabled = false

    function Slider__TickGroup(node)
    {
      var _tickGroup = node.querySelector('.Slider__TickGroup')
        , _track = node.querySelector('.Slider__Track')
        , _tick
        , _thumb = node.querySelector('.Slider__Track__Thumb')
        , _findPos = function(val,tick){

          var p = (val-Slider__TickGroup.min())/(Slider__TickGroup.max()-Slider__TickGroup.min())
            , _height = _tickGroup.clientHeight
            , _width = _tickGroup.clientWidth
            , offsetProp = ((Slider__TickGroup.direction() === 'vertical') ? _thumb.clientHeight : _thumb.clientWidth)

            p = ((Slider__TickGroup.direction() === 'vertical') ? (1-p) : p);

            return ((Slider__TickGroup.direction() === 'vertical') ? (((_height-offsetProp)*p)+(offsetProp/2)+2) : (((_width-offsetProp)*p)+(offsetProp/2) + 2))+'px';
        }
        , _findValueFromCount = function(count){
          var minCount = 0
            , maxCount = (Slider__TickGroup.ticks()-1)
            , min = Slider__TickGroup.min()
            , max = Slider__TickGroup.max()
            , p = (count/maxCount)
            , value = Math.ceil((((max-min)*(p))+min))
          if(value % Slider__TickGroup.tickStep() !== 0)
          {
            value = Math.round(value/Slider__TickGroup.tickStep()) * Slider__TickGroup.tickStep();
          }
          return value;
        }

      if(!_tickGroup)
      {
        _tickGroup = node.appendChild(document.createElement('div'));
      }
      _tickGroup.setAttribute('class','Slider__TickGroup Slider__TickGroup--'+Slider__TickGroup.direction()+' Slider__TickGroup--'+Slider__TickGroup.align())

      _tickGroup.innerHTML = "";

      Slider__TickGroup.ticks().forEach(function(t,x){
        var value = _findValueFromCount(x);

          _tick = CreateTick().text(_tickTextOverload)
          .direction(Slider__TickGroup.direction())
          .position(parseInt(_findPos(value),10))
          .disabled(Slider__TickGroup.disabled())
          .valuePosition((value < Slider__TickGroup.value()) ? 'under' : 'over')
          .text(value);

          _tick.call(_tick,_tickGroup);
      });
    }

    Slider__TickGroup.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = (_directionEnum.indexOf(d) > -1 ? d : _direction);
      return Slider__TickGroup;
    }

    Slider__TickGroup.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__TickGroup;
    }

    Slider__TickGroup.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__TickGroup;
    }

    Slider__TickGroup.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__TickGroup;
    }

    Slider__TickGroup.tickStep = function(s){
      if(s === undefined)
      {
        return _tickStep;
      }
      _tickStep = (typeof s === 'number' ? s : _tickStep);
      return Slider__TickGroup;
    }

    Slider__TickGroup.align = function(a){
      if(a === undefined)
      {
        return _align;
      }
      _align = (_alignEnum.indexOf(a) > -1 ? a : _align);
      return Slider__TickGroup;
    }

    Slider__TickGroup.ticks = function(t){
      if(t === undefined)
      {
        return _ticks;
      }
      _ticks = (typeof t === 'number' ? t : _ticks);
      return Slider__TickGroup;
    }

    Slider__TickGroup.tickTextOverload = function(t){
      if(t === undefined)
      {
        return _tickTextOverload;
      }
      _tickTextOverload = (typeof t === 'function' ? t : _tickTextOverload);
      return Slider__TickGroup;
    }

    Slider__TickGroup.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__TickGroup;
    }

    return Slider__TickGroup;
  }
  return CreateSlider__TickGroup;
});
