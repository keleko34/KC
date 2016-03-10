define(['./__Progressbar/Progressbar','./__Thumb/Thumb'],function(CreateSlider__Track__Progressbar,CreateSlider__Track__Thumb){
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

      Slider__Track.progressBar()
      .max(Slider__Track.max())
      .min(Slider__Track.min())
      .value(Slider__Track.value())
      .disabled(Slider__Track.disabled())
      .direction(Slider__Track.direction())
      .call(Slider__Track.progressBar(),_track);

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
});
