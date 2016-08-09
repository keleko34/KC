function koExtend(){

  var _events = {
    update:[],
    attach:[]
  };

  ko.override.extenders = {};
  ko.override.extenders.attach = function(target, attach){
    return compute(target,function(v){
      target((attach && v.indexOf(attach+" ") < 0 ? attach + " " + v : v));
      run_event('attach',(attach && v.indexOf(attach+" ") < 0 ? attach + " " + v : v),target())
    });
  },
  ko.override.extenders.px = function(target, isPX){
    return compute(target,function(v){
      target((parseInt(v,10)+(isPX ? 'px' : '')));
    });
  },
  ko.override.extenders.update = function(target, options){
    return compute(target,function(v){
        target(v);
        run_event('update',v,target(),options.name,options.key,options.viewmodel);
    });
  }


  function compute(target,write){
    var pureComp = ko.pureComputed({
      read:target,
      write:write
    });
    pureComp(target());
    return pureComp;
  }

  function event_object(options){
    this.value = options.value;
    this.oldvalue = options.oldvalue;
    this.key = options.key;
    this.component = options.name;
    this.event = options.event;
    this.view_model = options.view_model;
    this.stopPropogation = function(){
      this._stopPropogation = true;
    }
  }

  function run_event(type, value, oldvalue, name, key, viewmodel){
    var e = new event_object({type:type,value:value,name:name,key:key,view_model:viewmodel});
    loop:for(var x=0;x<_events[type].length;x++){
      _events[type][x](e);
      if(e._stopPropogation){
        break loop;
      }
    }
  }


  function Extend(){
    Object.keys(ko.override.extenders).forEach(function(ex){
      ko.extenders[ex] = ko.override.extenders[ex];
    });
  }

  Extend.addListener = function(ev,func){
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
    return Extend;
  }

  Extend.removeListener = function(ev,func){
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
    return Extend;
  }

  Extend.extendUpdate = function(obs,name,oKey,viewmodel){

    obs.subscribe(function(value) {
      run_event('update',v,target(),options.name,options.key,options.viewmodel);
    });
    return obs;
  }

  return Extend;
}

define([],function(){return koExtend});
define('koExtend',function(){return koExtend;})
