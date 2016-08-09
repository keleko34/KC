function koComponent(){

  var _events = {
        init:[],
        css:[],
        config:[],
        viewmodel:[],
        template:[]
      },
      _kb_textevents = ['innerHTML','outerHTML','textContent','innerText','outerText'];

  ko.override = {};

  ko.override.load = function(name,cb){
    if(!ko.components.isRegistered(name)){
      var query = parse_query(location.search),
      url = '/require/'+name;
      url = (query.env !== undefined ? url+'?env='+query.env : url);
      url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);
      if(!require.defined(url)){
         require([url],function(){
           //ko.override.css(name);
           cb();
         },function(err){console.error(name,' does not exist');});
      }
    }
    else {
      cb();
    }
  }

  ko.override.parsetemplate = function(template,cb){
    var matches = (template.match(/(<\/(.*?)>)/g) ? template.match(/(<\/(.*?)>)/g) : []).map(function(k,i){
      return k.substring(2,k.length-1);
    })
    .filter(function(k){
      return (document.createElement(k) instanceof HTMLUnknownElement);
    }),
    count = 0;

    if(matches.length < 1) return cb();

    for(var x=0;x<matches.length;x++){
      ko.override.load(matches[x],function(){
        count += 1;
        if(count === matches.length) cb();
      });
    }
  }

  ko.override.events = {};
  ko.override.events.oncss = function(options){run_event('css',options);}
  ko.override.events.ontemplate = function(options){run_event('template',options);}
  ko.override.events.onviewmodel = function(options){run_event('viewmodel',options);}
  ko.override.events.onconfig = function(options){run_event('config',options);}
  ko.override.events.oninit = function(options){run_event('init',options);}

  function textEvent(e){
    if(e.value.indexOf('ignore') < 0){
      ko.override.parsetemplate(e.value,function(){
        for(var x=0;x<e.target.children.length;x++){
          var child = e.target.children[x];
          ko.applyBindings({},child);
        }
      });
    }
  }

  _kb_textevents.forEach(function(k){
    kb.addAttrUpdateListener(k,textEvent);
  });

  kb.addAttrUpdateListener('appendChild',function(e){
    if(e.arguments[0] instanceof HTMLUnknownElement){
      ko.override.load(e.arguments[0].tagName,function(){
        ko.applyBindings({},e.arguments[0]);
      });
    }
  });



  function event_object(options){
    this.component = options.component;
    this.valueAccessor = options.valueAccessor;
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

  function parse_query(qstr){
        var query = {},
            a = qstr.substr(1).split('&');

        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
      }

  function Component(){

    var bh = ko.bindingHandlers,
        kc = ko.components;
    bh.component._init = (bh.component._init === undefined ? bh.component.init : bh.component._init);
    bh.component.init = function(el,valueAccessor,model,vm){
      ko.override.events.oninit({component:el.nodeName.toLowerCase(),target:el,view_model:vm,valueAcessor:valueAccessor});
      if(bh.component._init !== undefined){
        bh.component._init.apply(this,arguments);
      }
    }

    kc.loaders.unshift({
      getConfig:function(name, callback){
        ko.override.load(name,function(){
          kc.defaultLoader.getConfig(name, callback);
          ko.override.events.onconfig({component:name});
        });
      },
      loadViewModel:function(name, viewModelConfig, callback){
        if(typeof viewModelConfig !== 'function') return callback(null);
        kc.defaultLoader.loadViewModel(name,{
          createViewModel: function(params, componentInfo){
            var el = componentInfo.element;
                el.KViewModel = new viewModelConfig(params, componentInfo.element);
                ko.override.events.onviewmodel({component:name,view_model:el.KViewModel,target:el});
                return el.KViewModel;
          }
        }, callback);
      },
      loadTemplate:function(name, templateConfig, callback){
        if(typeof templateConfig !== 'string') callback(null);
        ko.override.parsetemplate(templateConfig,function(){
          kc.defaultLoader.loadTemplate(name, templateConfig, callback);
          ko.override.events.ontemplate({component:name,template:templateConfig});
        });
      },
      loadComponent:function(name, componentConfig, callback){
        kc.defaultLoader.loadComponent(name, componentConfig, callback);
      }
    });

  }

  Component.addListener = function(ev,func){
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
    return Component;
  }

  Component.removeListener = function(ev,func){
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
    return Component;
  }

  Component.parseCss = function(cssString,itarator){
    return cssString.split(/(.*?{.*?})/g)
    .filter(function(r){
      return (r.length > 0 && (r !== '\r\n' && r !== '\n'));
    })
    .map(function(r){
      return r.split(/(.*?)({)(.*?)(})/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
    })
    .reduce(function(o,r){
      o[r[0].replace(/\s/g,'')] = (r.length < 4 ? "" : r[2].split(/(.*?:.*?;)/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
      .reduce(function(ro,k){
        k = k.substring(2,k.length)
        ro[k.substring(0,k.indexOf(':')).replace(/\s/g,'')] = k.substring((k.indexOf(':')+1),k.indexOf(';'));
        if(typeof itarator === 'function'){
          itarator({selector:r[0].replace(/\s/g,''),rule:k.substring(0,k.indexOf(':')).replace(/\s/g,''),value:k.substring((k.indexOf(':')+1),k.indexOf(';'))});
        }
        return ro;
      },{}));
      return o;
    },{})
  }

  return Component;
}

define([],function(){return koComponent});
define('koComponent',function(){return koComponent;});
