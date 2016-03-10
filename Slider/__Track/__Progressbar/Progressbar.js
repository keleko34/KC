define([],function(){
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
            var p = 1-(val-Slider__Track__Progressbar.min())/(Slider__Track__Progressbar.max()-Slider__Track__Progressbar.min())
              , offsetProp = ((Slider__Track__Progressbar.direction() === 'vertical') ? _thumb.clientHeight : _thumb.clientWidth);
              return ((Slider__Track__Progressbar.direction() === 'vertical') ? ((_height-offsetProp)*p)+(offsetProp/2) : (((_width-offsetProp)*p)+(offsetProp/2)))+'px';
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
});
