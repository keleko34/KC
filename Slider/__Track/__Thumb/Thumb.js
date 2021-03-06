define([],function(){
  function CreateSlider__Track__Thumb()
  {
    var _value = 0
      , _max = 100
      , _min = 0
      , _step = 1
      , _shape = 'circle'
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _shapeEnum = ['circle','square','rectangle','custom']
      , _onChange = function(){}
      , _onMove = function(){}
      , _disabled = false

    function Slider__Track__Thumb(node)
    {
      var _thumb = node.querySelector('.Slider__Track__Thumb')
        , _isDown = false
        , _startPos
        , _startPagePos
        , _side = ((Slider__Track__Thumb.direction() === 'vertical') ? 'top' : 'left')
        , _height = node.clientHeight
        , _width = node.clientWidth
        , _findPos = function(val){
            var p = (val-Slider__Track__Thumb.min())/(Slider__Track__Thumb.max()-Slider__Track__Thumb.min());
            p = ((Slider__Track__Thumb.direction() === 'vertical') ? (1-p) : p);
            return ((Slider__Track__Thumb.direction() === 'vertical') ? ((_height-_thumb.clientHeight)*p) : ((_width-_thumb.clientHeight)*p))+'px';
          }
        , _findValue = function(pos){
              var p = parseInt(pos,10)/(Slider__Track__Thumb.direction() === 'vertical' ? (_height-_thumb.clientHeight) : (_width-_thumb.clientWidth));
              p = (Slider__Track__Thumb.direction() === 'vertical' ? (1-p) : p);
              return  ((Slider__Track__Thumb.max()-Slider__Track__Thumb.min())*(p))+Slider__Track__Thumb.min();
          }
        , _mouseMove = function(e){
              e.preventDefault();
              e.stopPropagation();
              if(e.originalEvent !== undefined && e.originalEvent.touches !== undefined){
                e = e.originalEvent.touches[0];
              }
              if(e.changedTouches !== undefined && e.changedTouches[0] !== undefined)
              {
                e = e.changedTouches[0]
              }
              var change = (Slider__Track__Thumb.direction() === 'vertical' ? (_startPagePos-e.pageY) : (_startPagePos-e.pageX))
                , newPos = (_startPos-change)
                , max = (Slider__Track__Thumb.direction() === 'vertical' ? (_height-_thumb.clientHeight) : (_width-_thumb.clientHeight))
                , min = 0
                , setPos = (newPos <= max ? (newPos >= min ? newPos+'px' : min+'px') : max+'px')
                , value = parseInt(_findValue(setPos),10)

              if(value % Slider__Track__Thumb.step() !== 0)
              {
                value = Math.ceil(value/Slider__Track__Thumb.step()) * Slider__Track__Thumb.step();
              }
              _thumb.style[_side] = _findPos(value);
              Slider__Track__Thumb.value(value);
              Slider__Track__Thumb.onMove().call({},Slider__Track__Thumb);
          }
        , _mouseUp = function(){
              document.removeEventListener('mousemove',_mouseMove);
              document.removeEventListener('mouseup',_mouseUp);
              document.removeEventListener('touchmove',_mouseMove);
              document.removeEventListener('touchend',_mouseUp);
              Slider__Track__Thumb.onChange().call({},Slider__Track__Thumb);
          }
        , _mouseDown = function(e){
          if(!Slider__Track__Thumb.disabled())
            {
              e.preventDefault();
              e.stopPropagation();
              if(e.originalEvent !== undefined && e.originalEvent.touches !== undefined){
                e = e.originalEvent.touches[0];
              }
              if(e.changedTouches !== undefined && e.changedTouches[0] !== undefined)
              {
                e = e.changedTouches[0]
              }
              _startPagePos = (Slider__Track__Thumb.direction() === 'vertical' ? e.pageY : e.pageX);
              _startPos = parseInt(_thumb.style[_side],10);
              document.addEventListener('mousemove',_mouseMove);
              document.addEventListener('mouseup',_mouseUp);
              document.addEventListener('touchmove',_mouseMove);
              document.addEventListener('touchend',_mouseUp);
            }
          }


      if(!_thumb)
      {
        _thumb = node.appendChild(document.createElement('div'));
        _thumb.onmousedown = _mouseDown;
        _thumb.addEventListener('touchstart',_mouseDown);
      }
      _thumb.setAttribute('class','Slider__Track__Thumb Slider__Track__Thumb--'+Slider__Track__Thumb.shape()+' Slider__Track__Thumb--'+Slider__Track__Thumb.direction());

      _thumb.style[((Slider__Track__Thumb.direction() === 'vertical') ? 'top' : 'left')] = _findPos(Slider__Track__Thumb.value());
    }

    Slider__Track__Thumb.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.step = function(s){
      if(s === undefined)
      {
        return _step;
      }
      _step = (typeof s === 'number' ? s : _step);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = ((_directionEnum.indexOf(d) > -1) ? d : _direction);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.shape = function(s){
      if(s === undefined)
      {
        return _shape;
      }
      _shape = ((_shape.indexOf(s) > -1) ? s : _shape);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.onChange = function(c){
      if(c === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof c === 'function' ? c : _onChange);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.onMove = function(m){
      if(m === undefined)
      {
        return _onMove;
      }
      _onMove = (typeof m === 'function' ? m : _onMove);
      return Slider__Track__Thumb;
    }

    Slider__Track__Thumb.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__Track__Thumb;
    }

    return Slider__Track__Thumb;
  }
  return CreateSlider__Track__Thumb;
})
