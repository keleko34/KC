function koBinding(){

  ko.override.events.onElement = function(options){run_event('element',options);}
  ko.override.events.onValueAccessor = function(options){run_event('viewmodel',options);}
  ko.override.events.onMainClass = function(options){run_event('main',options);}

  var textBindings = ['textContent','innerHTML'],
      eventBindings = function(el){
        return Object.keys(HTMLElement.prototype).filter(function(k){
          return (k.indexOf('on')  === 0);
        });
      },
      attrBindings = function(el){
        return Array.prototype.slice.call(el.attributes)
        .map(function(k){return k.name;})
        .filter(function(k){return (k !== 'data-bind')});
      },
      _injector = function(k){return k;},
      _bind = {

      },
      _injected = {

      }

  var _events = {
    element:[],
    viewmodel:[],
    main:[]
  }

  function event_object(options){
    this.component = options.component;
    this.key = options.key;
    this.value = options.value;
    this.oldvalue = options.oldvalue;
    this.target = options.target;
    this.template = options.template
    this.event = options.event;
    this.view_model = options.view_model;
    this.stopPropogation = function(){
      this._stopPropogation = true;
    }
  }

  function run_event(type,options){
    options.event = type;
    var e = new event_object(options);
    loop:for(var x=0;x<_events[type].length;x++){
      _events[type][x](e);
      if(e._stopPropogation){
        break loop;
      }
    }
  }

  function checkClass(viewmodel,key,value){
    if(typeof viewmodel.methods[key] === 'function' && !viewmodel.methods[key].ignore){

      if(ko.isObservable(viewmodel[key+"_binding"])){
        if(viewmodel.methods[key]() !== value){
          viewmodel.methods[key](value);
          viewmodel.methods();
        }
      }
      else{
        if(value !== undefined && value !== null && viewmodel.methods[key]().toString() !== value.toString()){
          viewmodel.methods[key](value);
          viewmodel.methods();
        }
      }

      if(ko.isObservable(viewmodel[key+"_binding"]) && viewmodel[key+'_binding']() !== viewmodel.methods[key]()){
        return viewmodel.methods[key]();
      }
      else if(value !== undefined && value !== null){
        return viewmodel.methods[key]();
      }
    }
    return value;
  }

  function setViewModel(viewmodel,key,value){
    key = key.replace(/(_binding)/g,'');
    if(viewmodel[key+'_binding'] !== undefined){
      value = checkClass(viewmodel,key,value);
      if(ko.isObservable(viewmodel[key+'_binding']) && (viewmodel[key+'_binding']() !== value)){
        viewmodel[key+'_binding'](value);
      }
      else if(ko.isObservable(viewmodel[key+'_binding']) && value === undefined && viewmodel[key+'_binding']() !== undefined){
        viewmodel[key+'_binding'](value);
      }
      else if(!ko.isObservable(viewmodel[key+'_binding']) && value){
        viewmodel[key+'_binding'] = value;
      }
    }
    else{
      viewmodel[key+'_binding'] = (typeof value !== 'function' ? ko.observable(value): value);
    }
  }

  function Binding(viewmodel,el){
    Object.keys(el.ko_binds).forEach(function(b){
      setViewModel(viewmodel,b,el.ko_binds[b]);
    });
    Object.keys(viewmodel.methods).filter(function(k){
      return (k !== 'viewmodel');
    }).forEach(function(k){
      Binding.inject(viewmodel,viewmodel.Node_Type,k+"_binding",viewmodel.methods[k]());
    });
    Object.keys(viewmodel).forEach(function(k){
      Binding.inject(viewmodel,viewmodel.Node_Type,k);
    });
  }

  Binding.injector = function(v){
    if(v === undefined){
      return _injector;
    }
    if(typeof v === 'function'){
      _injector = v;
    }
    return Binding;
  }

  Binding.inject = function(vm, name, key, value){
    if(ko.isObservable(vm[key]) && _injected[key] === undefined){
      vm[key] = _injector(vm[key],name,key,vm);
      _injected[key] = true;
    }
    else if(vm[key] === undefined){
      if(typeof value === 'function'){
        vm[key] = value;
      }
      else{
        vm[key] = ko.observable(value);
        vm[key] = _injector(vm[key],name,key,vm);
        _injected[key] = true;
      }
    }
    return Binding;
  }

  Binding.addListener = function(ev,func){
    if(typeof ev === 'string' && (Object.keys(_events).indexOf(ev) > -1 || ev === '*')){
      if(ev === '*'){
        Object.keys(_events).forEach(function(k){
          _events[k].push(func);
        });
      }
      else{
        _events[ev].push(func);
      }
    }
    return Binding;
  }

  Binding.removeListener = function(ev,func){
    if(typeof ev === 'string' && (_eventEnum.indexOf(ev) > -1 || ev === '*')){

      function event_looper(e){
        loop:for(var x=0;x<_events[e];x++){
          if(_events[e][x].toString() === func.toString()){
            _events[e].splice(x,1);
            break loop;
          }
        }
      }
      if(ev === '*'){
        Object.keys(_events).forEach(function(k){
          event_looper(k);
        });
      }
      else{
        event_looper(ev);
      }
    }
    return Binding;
  }

  Binding.update = function(e){
    e.view_model.Node.ko_binds[e.key.replace('_binding','')] = e.value;
    setViewModel(e.view_model,e.key,e.value);
  }

  Binding.getDefaults = function(el){
    el.ko_binds = (el.ko_binds === undefined ? {} : el.ko_binds);
    textBindings.concat(eventBindings(el)).concat(attrBindings(el)).forEach(function(k,i){
      if(k.indexOf('on') === 0){
        el.ko_binds[k.replace('_binding','').toLowerCase()] = (el[k] || (el.getAttribute(k) ? eval('(function(e){'+el.getAttribute(k)+'})') : undefined));
        el[k] = null;
        el.removeAttribute(k);
      }
      else{
        el.ko_binds[k.replace('_binding','').toLowerCase()] = (el[k] || el.getAttribute(k));
      }
      if(textBindings.indexOf(k) < 0){
        el.addAttrListener(k,function(e){
          e.preventDefault();
          ko.override.events.onElement({key:e.attr,value:e.value,target:el,view_model:el.KViewModel});
        });
      }
    });
    el.addAttrListener('setAttribute',function(e){
      if(e.argument[0].indexOf('on') === 0){
        e.argument[1] = eval('(function(e){'+el.getAttribute(k)+'})');
        e.preventDefault();
      }
      ko.override.events.onElement({key:e.argument[0],value:e.argument[1],target:el,view_model:el.KViewModel});
    });

    Binding.binds = function(){
      return _bind;
    }

    return Binding;
  }


  return Binding;
}

define([],function(){return koBinding});
define('koBinding',function(){return koBinding;})
