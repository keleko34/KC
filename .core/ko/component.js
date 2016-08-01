function koComponent(){

  var _events = {
        init:[],
        css:[],
        config:[],
        viewmodel:[],
        template:[]
      };

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

  /*
  ko.override.css = function(name){
    var _styleNode = document.getElementById('src_styles'),
        query = parse_query(location.search),
        url = '/require_css/'+name;
        url = (query.env !== undefined ? url+'?env='+query.env : url);
        url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);

    if(!_styleNode){
        _styleNode = document.createElement('style');
        _styleNode.setAttribute('id','src_styles');
        _styleNode.setAttribute('media','screen');
        _styleNode.setAttribute('type','text/css');
        _styleNode.addAttrListener('textContent',function(e){
              var name = e.value.replace(new RegExp("("+e.oldvalue+")"),'')
              .replace(/(@import)/g,'')
              .replace(/\s/g,'')
              .split('/')[2];
              ko.override.events.oncss({component:name});
         });
      document.head.appendChild(_styleNode);
    }
    if(_styleNode.textContent.indexOf('"'+url+'"') < 0){
        _styleNode.textContent += '\r\n@import "'+url+'";';
    }
  }
  */

  /*
  ko.override.css = function(name){
    var query = parse_query(location.search),
        url = '/require_css/'+name;
        url = (query.env !== undefined ? url+'?env='+query.env : url);
        url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url),
        _styleNode = document.querySelector('style[src="'+url+'"]');

    if(!_styleNode){
        _styleNode = document.createElement('link');
        _styleNode.setAttribute('rel','stylesheet')
        _styleNode.onload = function(e){
          ko.override.events.oncss({component:name});
        }
        _styleNode.setAttribute('href',url);
      document.head.appendChild(_styleNode);
    }
  }
  */


  ko.override.events = {};
  ko.override.events.oncss = function(options){run_event('css',options);}
  ko.override.events.ontemplate = function(options){run_event('template',options);}
  ko.override.events.onviewmodel = function(options){run_event('viewmodel',options);}
  ko.override.events.onconfig = function(options){run_event('config',options);}
  ko.override.events.oninit = function(options){run_event('init',options);}

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

  return Component;
}

define([],function(){return koComponent});
define('koComponent',function(){return koComponent;});
