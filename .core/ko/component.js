function koComponent(){

  var _eventEnum = ['init','config','viewmodel','template','css'],
      _events = {};

  ko.override = {};

  ko.override.load = function(name,cb){
    if(!ko.components.isRegistered(name)){
      var query = parse_query(location.search),
      url = '/require/'+name;
      url = (query.env !== undefined ? url+'?env='+query.env : url);
      url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);
      if(!require.defined(k)){
         require([k],function(){
           ko.override.css(name);
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
      return (document.createElement(matches[x]) instanceof HTMLUnknownElement);
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

  ko.override.css = function(name){
    var _styleNode = document.getElementById('src_styles'),
        _query = parse_query(location.search),
        _url = '/require_css/'+name;
        url = (query.env !== undefined ? url+'?env='+query.env : url);
        url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);

    if(!_styleNode){
        _styleNode = document.createElement('style');
        _styleNode.setAttribute('id','src_styles');
        _styleNode.setAttribute('media','screen');
        _styleNode.setAttribute('type','text/css');
        _styleNode.addAttrListener('textContent',function(e){
              var name = e.value.replace(new RegExp("("+e.oldvalue+")"),'')
              .replace('@import','')
              .replace(/\s/g,'')
              .split('/')[2];
              console.log(name);
              ko.override.events.css(name);
         });
      document.head.appendChild(_styleNode);
    }
    if(_styleNode.textContent.indexOf('"'+url+'"') < 0){
        _styleNode.textContent += '\r\n@import "'+url+'";';
    }
  }

  ko.override.events = {};
  ko.override.events.oncss = function(name){run_event('css',name);}
  ko.override.events.ontemplate = function(name){run_event('template',name);}
  ko.override.events.onviewmodel = function(name,vm){run_event('viewmodel',name,vm);}
  ko.override.events.onconfig = function(name){run_event('config',name);}
  ko.override.events.oninit = function(name){run_event('init',name);}

  function event_object(options){
    this.component = options.name;
    this.event = options.event;
    this.view_model = options.view_model;
    this.stopPropogation = function(){
      this._stopPropogation = true;
    }
  }

  function run_event(type,name,vm){
    var e = new event_object({event:type,name:name,view_model:vm});
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
      ko.override.events.oninit(el.nodeName.toLowerCase());
      if(bh.component._init !== undefined){
        bh.component._init.apply(this,arguments);
      }
    }

    kc.loaders.unshift({
      getConfig:function(name, callback){
        ko.override.load(name,function(){
          kc.defaultLoader.getConfig(name, callback);
          ko.override.events.onconfig(name);
        });
      },
      loadViewModel:function(name, viewModelConfig, callback){
        if(typeof viewModelConfig !== 'function') return callback(null);
        kc.defaultLoader.loadViewModel(name,{
          createViewModel: function(params, componentInfo){
            var el = componentInfo.element;
                el.KViewModel = new viewModelConfig(params, componentInfo.element);
                ko.override.events.onviewmodel(name);
                return el.KViewModel;
          }
        }, callback);
      },
      loadTemplate:function(name, templateConfig, callback){
        if(typeof templateConfig !== 'string') callback(null);
        ko.override.parsetemplate(templateConfig,function(){
          kc.defaultLoader.loadTemplate(name, templateConfig, callback);
          ko.override.events.ontemplate(name);
        });
      }
    });

  }

  Component.addListener = function(ev,func){
    if(typeof ev === 'string' && _eventEnum.indexOf(ev) > -1){
      if(_events[ev] === undefined){
        _events[ev] = [];
      }
      _events[ev].push(func);
    }
    return Component;
  }

  Component.removeListener = function(ev,func){
    if(typeof ev === 'string' && _eventEnum.indexOf(ev) > -1){
      loop:for(var x=0;x<_events[ev];x++){
        if(_events[ev][x].toString() === func.toString()){
          _events[ev].splice(x,1);
          break loop;
        }
      }
    }
    return Component;
  }

  return Component;
}

define([],function(){return koComponent});
define('koComponent',function(){return koComponent;});
