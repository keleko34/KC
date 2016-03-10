/* BUILD SECTION */
var CreateSlider__Track__Thumb = (function(){
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
              _thumb.style[_side] = _findPos(value)+"px";
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
}());

var CreateSlider__Track__Progressbar = (function(){
  function CreateSlider__Track__Progressbar()
  {
    var _max = 100
      , _min = 0
      , _value = 0
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _disabled = false

    function Slider__Track__Progressbar(node)
    {
      var _progressBar = node.querySelector('.Slider__Track__Progressbar')
        , _height = node.clientHeight
        , _width = node.clientWidth
        , _thumb = node.querySelector('.Slider__Track__Thumb')
        , _findPos = function(val){
            var p = (val-Slider__Track__Progressbar.min())/(Slider__Track__Progressbar.max()-Slider__Track__Progressbar.min())
              , offsetProp = ((Slider__Track__Progressbar.direction() === 'vertical') ? _thumb.clientHeight : _thumb.clientWidth);
              return ((Slider__Track__Progressbar.direction() === 'vertical') ? ((_height-offsetProp)*p)+(offsetProp/2) : ((_width-offsetProp)*p)+(offsetProp/2))+'px';
          }

      if(!_progressBar)
      {
        _progressBar = node.appendChild(document.createElement('div'));
      }
      _progressBar.setAttribute('class','Slider__Track__Progressbar Slider__Track__Progressbar--'+Slider__Track__Progressbar.direction());
      _progressBar.style.height = (Slider__Track__Progressbar.direction() === 'vertical' ? (_findPos(Slider__Track__Progressbar.value())) : '');
      _progressBar.style.width = (Slider__Track__Progressbar.direction() === 'horizontal' ? (_findPos(Slider__Track__Progressbar.value())) : '');
    }

    Slider__Track__Progressbar.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__Track__Progressbar;
    }

    Slider__Track__Progressbar.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__Track__Progressbar;
    }

    Slider__Track__Progressbar.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__Track__Progressbar;
    }

    Slider__Track__Progressbar.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = ((_directionEnum.indexOf(d) > -1) ? d : _direction);
      return Slider__Track__Progressbar;
    }

    Slider__Track__Progressbar.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__Track__Progressbar;
    }

    return Slider__Track__Progressbar;
  }
  return CreateSlider__Track__Progressbar;
}());;

var CreateSlider__TickGroup__Tick = (function(){
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
}());

var CreateSlider__IncrementGroup__IncrementBtn = (function(){
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
}());;

var CreateSlider__Track = (function(){
  function CreateSlider__Track()
  {
    var _max = 100
      , _min = 0
      , _value = 0
      , _step = 1
      , _direction = 'vertical'
      , _directionEnum = ['vertical','horizontal']
      , _onChange = function(){}
      , _thumb = CreateSlider__Track__Thumb()
      , _progressBar = CreateSlider__Track__Progressbar()
      , _disabled = false

    function Slider__Track(node)
    {
      var _track = node.querySelector('.Slider__Track');
      if(!_track)
      {
        _track = node.appendChild(document.createElement('div'));
      }
      _track.setAttribute('class','Slider__Track Slider__Track--'+Slider__Track.direction());

      Slider__Track.thumb()
      .max(Slider__Track.max())
      .min(Slider__Track.min())
      .value(Slider__Track.value())
      .step(Slider__Track.step())
      .direction(Slider__Track.direction())
      .disabled(Slider__Track.disabled())
      .onChange(Slider__Track.onChange())
      .onMove(Slider__Track.onMove())
      .call(Slider__Track.thumb(),_track);

      Slider__Track.progressBar()
      .max(Slider__Track.max())
      .min(Slider__Track.min())
      .value(Slider__Track.value())
      .disabled(Slider__Track.disabled())
      .direction(Slider__Track.direction())
      .call(Slider__Track.progressBar(),_track);

    }

    Slider__Track.max = function(m){
      if(m === undefined)
      {
        return _max;
      }
      _max = (typeof m === 'number' ? m : _max);
      return Slider__Track;
    }

    Slider__Track.min = function(m){
      if(m === undefined)
      {
        return _min;
      }
      _min = (typeof m === 'number' ? m : _min);
      return Slider__Track;
    }

    Slider__Track.value = function(v){
      if(v === undefined)
      {
        return _value;
      }
      _value = (typeof v === 'number' ? v : _value);
      return Slider__Track;
    }

    Slider__Track.direction = function(d){
      if(d === undefined)
      {
        return _direction;
      }
      _direction = ((_directionEnum.indexOf(d) > -1) ? d : _direction);
      return Slider__Track;
    }

    Slider__Track.step = function(s){
      if(s === undefined)
      {
        return _step;
      }
      _step = (typeof s === 'number' ? s : _step);
      return Slider__Track;
    }

    Slider__Track.onChange = function(c){
      if(c === undefined)
      {
        return _onChange;
      }
      _onChange = (typeof c === 'function' ? c : _onChange);
      return Slider__Track;
    }

    Slider__Track.onMove = function(m){
      if(m === undefined)
      {
        return _onMove;
      }
      _onMove = (typeof m === 'function' ? m : _onMove);
      return Slider__Track;
    }

    Slider__Track.thumb = function(t){
      if(t === undefined)
      {
        return _thumb;
      }
      _thumb = (t.toString() === CreateSlider__Track__Thumb().toString() ? t : _thumb);
      return Slider__Track;
    }

    Slider__Track.progressBar = function(p){
      if(p === undefined)
      {
        return _progressBar;
      }
      _progressBar = (p.toString() === CreateSlider__Track__Progressbar().toString() ? p : _progressBar);
      return Slider__Track;
    }

    Slider__Track.disabled = function(d){
      if(d === undefined)
      {
        return _disabled;
      }
      _disabled = !!d;
      return Slider__Track;
    }

    return Slider__Track;
  }
  return CreateSlider__Track;
}());;

var CreateSlider__TickGroup = (function(){
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
        , x = 0
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

      for(x=0;x<Slider__TickGroup.ticks();x+=1)
      {
        var value = _findValueFromCount(x);

          _tick = CreateTick().text(_tickTextOverload)
          .direction(Slider__TickGroup.direction())
          .position(parseInt(_findPos(value),10))
          .disabled(Slider__TickGroup.disabled())
          .valuePosition((value < Slider__TickGroup.value()) ? 'under' : 'over')
          .text(value);

          _tick.call(_tick,_tickGroup);
      }
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
}());;

var CreateSlider__IncrementGroup = (function(){
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
}());;




/* END BUILD SECTION */

var CreateSlider = (function(){
	function CreateSlider(){

      var _max = 100
        , _min = 0
        , _value = 0
        , _step = 1
        , _tickStep = 1
        , _onChange = function(){}
        , _onMove = function(){}
        , _direction = 'vertical'
        , _directionEnum = ['vertical','horizontal']
        , _buttons = []
        , _ticks = 0
        , _tickTextOverload = function(v){return v;}
        , _track = CreateSlider__Track()
        , _tickGroup = CreateSlider__TickGroup()
        , _incrementGroup = CreateSlider__IncrementGroup()
        , _validation = function(){return true}
        , _disabled = false
        , _extend = function(){}


      function Slider(node){
        node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
        if(!node)
        {
            console.error('you have passed an invalid node into Slider: ',node);
            return;
        }

        var _slider = node.querySelector('.Slider');
        if(!_slider)
        {
          _slider = node.appendChild(document.createElement('div'));
        }
        _slider.setAttribute('class','Slider Slider--'+Slider.direction()+" Slider--"+(Slider.disabled() ? 'disabled' : 'enabled'));

        if(Slider.value() > Slider.max())
        {
          Slider.value(Slider.max());
        }

        if(Slider.value() < Slider.min())
        {
          Slider.value(Slider.min());
        }

        Slider.extend().call(Slider,_slider);

        Slider.track()
        .min(Slider.min())
        .max(Slider.max())
        .value(Slider.value())
        .step(Slider.step())
        .onChange(Slider.onChange())
        .direction(Slider.direction())
        .disabled(Slider.disabled())
        .onMove(function(v){
          Slider.value(v);
          Slider.onMove()(v);
          Slider.call(Slider,node);
        })
        .call(Slider.track(),_slider);

        Slider.tickGroup()
        .min(Slider.min())
        .max(Slider.max())
        .value(Slider.value())
        .tickStep(Slider.tickStep())
        .direction(Slider.direction())
        .ticks(Slider.ticks())
        .disabled(Slider.disabled())
        .tickTextOverload(Slider.tickTextOverload())
        .call(Slider.tickGroup(),_slider);

        Slider.incrementGroup()
        .value(Slider.value())
        .direction(Slider.direction())
        .max(Slider.max())
        .min(Slider.min())
        .buttons(Slider.buttons())
        .disabled(Slider.disabled())
        .onChange(function(v){Slider.value(v);Slider.onChange()(v);selection.call(Slider)})
        .call(Slider.incrementGroup(),_slider);

      }

      Slider.max = function(m){
        if(m === undefined)
        {
          return _max;
        }
        _max = ((typeof m === 'number' || !isNaN(parseFloat(m))) ? parseFloat(m) : _max);
        return Slider;
      }

      Slider.min = function(m){
        if(m === undefined)
        {
          return _min;
        }
        _min = ((typeof m === 'number' || !isNaN(parseFloat(m))) ? parseFloat(m) : _min);
        return Slider;
      }

      Slider.value = function(v){
        if(v === undefined)
        {
          return _value;
        }
        _value = ((typeof v === 'number' || !isNaN(parseFloat(v))) ? parseFloat(v) : _value);
        return Slider;
      }

      Slider.track = function(v){
        if(v === undefined)
        {
          return _track;
        }
        _track = (v.toString() === CreateSlider__Track() ? v : _track);
        return Slider;
      }

      Slider.tickGroup = function(v){
        if(v === undefined)
        {
          return _tickGroup;
        }
        _tickGroup = (v.toString() === CreateSlider__TickGroup() ? v : _tickGroup);
        return Slider;
      }

      Slider.incrementGroup = function(v){
        if(v === undefined)
        {
          return _incrementGroup;
        }
        _incrementGroup = (v.toString() === CreateSlider__IncrementGroup() ? v : _incrementGroup);
        return Slider;
      }

      Slider.step = function(s){
        if(s === undefined)
        {
          return _step;
        }
        _step = ((typeof s === 'number' || !isNaN(parseFloat(s))) ? parseFloat(s) : _step);
        return Slider;
      }

      Slider.tickStep = function(s){
        if(s === undefined)
        {
          return _tickStep;
        }
        _tickStep = ((typeof s === 'number' || !isNaN(parseFloat(s))) ? parseFloat(s) : _tickStep);
        return Slider;
      }

      Slider.onChange = function(c){
        if(c === undefined)
        {
          return _onChange;
        }
        _onChange = (typeof c === 'function' ? c : _onChange);
        return Slider;
      }

      Slider.onMove = function(m){
        if(m === undefined)
        {
          return _onMove;
        }
        _onMove = (typeof m === 'function' ? m : _onMove);
        return Slider;
      }

      Slider.direction = function(d){
        if(d === undefined)
        {
          return _direction;
        }
        _direction = ((_directionEnum.indexOf(d) > -1) ? d : _direction);
        return Slider;
      }

      Slider.buttons = function(n,b){
        if(n === undefined)
        {
          return _buttons;
        }
        if(b === undefined)
        {
          _buttons = (n.constructor === Array ? n : _buttons);
          return Slider;
        }
        if(typeof n === 'string' && b.constructor === Object)
        {
          b.name = n;
          _buttons.push(b)
        }

      }

      Slider.ticks = function(t){
        if(t === undefined)
        {
          return _ticks;
        }
        _ticks = ((typeof t === 'number' || !isNaN(parseFloat(t))) ? parseFloat(t) : _ticks);
        return Slider;
      }

      Slider.tickTextOverload = function(t){
        if(t === undefined)
        {
          return _tickTextOverload;
        }
        _tickTextOverload = (typeof t === 'function' ? t : _tickTextOverload);
        return Slider;
      }

      Slider.validation = function(f){
        if(f === undefined)
        {
          return _validation;
        }
        if(typeof f === 'function')
        {
          _validation = (typeof f === 'function' ? f : _validation);
          return Slider;
        }
        else
        {
          return _validation(f);
        }
      }

      Slider.disabled = function(d){
        if(d === undefined)
        {
          return _disabled;
        }
        _disabled = !!d;
        return Slider;
      }

      Slider.extend = function(c){
        if(c === undefined)
        {
          return _extend;
        }
        _extend = (typeof c === 'function' ? c : _extend);
        return Slider;
      }

      return Slider;
	}
	return CreateSlider;
}())
