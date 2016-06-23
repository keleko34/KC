define([],function(){
  function CreateSlider__TickGroup__Tick()
  {
    var _position = 0
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _text = ''
      , _textOverLoad = function(v){return v;}
      , _valuePosition = 'over'
      , _valuePositionEnum = ['under','over']
      , _disabled = false

    function Slider__TickGroup__Tick(node)
    {
      var _tick = node.appendChild(document.createElement('div'))
        , _tickLine = _tick.appendChild(document.createElement('div'))
        , _tickText = _tick.appendChild(document.createElement('div'))


      _tick.setAttribute('class','Slider__TickGroup__Tick Slider__TickGroup__Tick--'+Slider__TickGroup__Tick.direction());
      _tick.style.top = (Slider__TickGroup__Tick.direction() === 'vertical' ? Slider__TickGroup__Tick.position() : 0)+'px';
      _tick.style.left = (Slider__TickGroup__Tick.direction() === 'horizontal' ? Slider__TickGroup__Tick.position() : 0)+'px';

      _tickLine.setAttribute('class','Slider__TickGroup__Tick__Line Slider__TickGroup__Tick__Line--'+Slider__TickGroup__Tick.direction()+' Slider__TickGroup__Tick__Line--'+Slider__TickGroup__Tick.valuePosition());

      _tickText.setAttribute('class','Slider__TickGroup__Tick__Text Slider__TickGroup__Tick__Text--'+Slider__TickGroup__Tick.direction()+' Slider__TickGroup__Tick__Text--'+Slider__TickGroup__Tick.valuePosition());
      _tickText.innerHTML = Slider__TickGroup__Tick.text();
      _tickText.style.top = (Slider__TickGroup__Tick.direction() === 'vertical' ? '-'+((_tickText.clientHeight/2)-1) : '')+'px';
      _tickText.style.left = (Slider__TickGroup__Tick.direction() === 'vertical' ? '' : '-'+((_tickText.clientWidth/2)-1))+'px';
      _tickText.style.textAlign = (Slider__TickGroup__Tick.direction() === 'vertical' ? (Slider__TickGroup__Tick.valuePosition() === 'left' ? 'right' :'left') : '');
    }

    Slider__TickGroup__Tick.position = function(p){
      if(p === undefined)
      {
        return _position;
      }
      _position = (typeof p === 'number' ? p : _position);
      return Slider__TickGroup__Tick;
    }

    Slider__TickGroup__Tick.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = ((_directionEnum.indexOf(d) > -1) ? d : _direction);
      return Slider__TickGroup__Tick;
    }

    Slider__TickGroup__Tick.text = function(t){
      if(t === undefined)
      {
        return _text;
      }
      if(typeof t === 'function')
      {
        _textOverLoad = t;
      }
      else
      {
        _text = _textOverLoad(t);
      }
      return Slider__TickGroup__Tick;
    }

    Slider__TickGroup__Tick.valuePosition = function(b){
      if(b === undefined)
      {
        return _valuePosition;
      }
      _valuePosition = (_valuePositionEnum.indexOf(b) > -1 ? b : _valuePosition);
      return Slider__TickGroup__Tick;
    }

    Slider__TickGroup__Tick.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__TickGroup__Tick;
    }

    return Slider__TickGroup__Tick;
  }
  return CreateSlider__TickGroup__Tick;
})
