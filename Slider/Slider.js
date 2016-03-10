/* BUILD SECTION */
/* END BUILD SECTION */

define(['./__Track/Track','./__TickGroup/TickGroup','./__IncrementGroup/IncrementGroup'],function(CreateSlider__Track,CreateSlider__TickGroup,CreateSlider__IncrementGroup){
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
})
