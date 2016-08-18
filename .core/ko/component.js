/* This file controls all auto-loading functionality of components
 * as well as the loading process and automated html decoding sub component loader.
 *
 * Created By Keleko34
 */

/* important component attachments:

   #element.ko_overrides

    **whether the element has innerHTML content**
    #element.ko_overrides.postcheck

    **if this is an append by knockout or user**
    #element.ko_overrides.postappend

    **the binds from the original element**
    #element.ko_overrides.binds
*/

var _textEvents = ['innerHTML','outerHTML','textContent','innerText','outerText'],
    _loadOrder = {
      getConfig:ko.components.defaultLoader.getConfig,
      loadComponent:ko.components.defaultLoader.loadComponent,
      loadTemplate:ko.components.defaultLoader.loadTemplate,
      loadViewModel:ko.components.defaultLoader.loadViewModel
    }

/* Constructor that ties KB to component loader and initiates the custom loader */
function integrateComponents(){

  /* attach binding changes */
  _textEvents.forEach(function(k){
    kb.addAttrUpdateListener(k,function(e){
      /* ko attaches an ignore text at the beggining of html inserts */
      if(e.value && e.value.indexOf('ignore') < 0){
        integrateComponents.parseNodeTemplate('html',e.target);
      }
    });
  });

  kb.addAttrUpdateListener('appendChild',function(e){
    var node = integrateComponents.getNearestComponent(e.target);

    if(node.ko_override && !node.KC){
      node.ko_override.postappend = true;
    }
    if(node.ko_override && node.KC){
      node.ko_override.postappend = false;
      node.ko_override.postcheck = true;
    }

    if(node.ko_override && node.ko_override.postappend){

    }

    if((node.ko_override && node.ko_override.postcheck)){
      integrateComponents.parseNodeTemplate('html',e.target);
    }

  });

  ko.components.loaders.unshift(_loadOrder);
}

/******* KO OVERRIDES ********/

/* overwrites existing binding handler */
integrateComponents.overwriteBindHandler = function(name,type,func){
  ko.bindingHandlers[name]['_'+type] = ko.bindingHandlers[name][type];
  ko.bindingHandlers[name][type] = function(element, valueAccessor, allBindings, viewModel, bindingContext){
    if(ko.bindingHandlers[name]['_'+type]) ko.bindingHandlers[name]['_'+type].apply(this,arguments);
    func({
      target:element,
      value:valueAccessor(),
      view_model:viewModel,
      type:'html'
    });
  };
  return integrateComponents;
}

/* This method is run prior to any component action at all, only a name of the compoennt is provided */
integrateComponents.overwriteGetConfig = function(func){
  var self = this,
      args = arguments;

  _loadOrder.getConfig = function(name,callback){
    func(name,function(){
      ko.components.defaultLoader.getConfig(name,callback);
    });
  }
  return integrateComponents;
}

/* This method runs after the viewmodel and the template are fetched for the component */
integrateComponents.overwriteLoadComponent = function(func){
  _loadOrder.loadComponent = function(name, componentConfig, callback){
    func({name:name,view_model:componentConfig.viewModel,template:componentConfig.template});
    ko.components.defaultLoader.loadComponent(name, componentConfig, callback);
  }
  return integrateComponents;
}

/* This method runs prior to insert of the template */
integrateComponents.overwriteLoadTemplate = function(func){
  _loadOrder.loadTemplate = function(name,templateConfig,callback){
    if(typeof templateConfig !== 'string') callback(null);
    var self = this,
        args = arguments;
    if(kc.templates[name]) kc.templates[name] = templateConfig;
    func(name,templateConfig,function(){
      ko.components.defaultLoader.loadTemplate(name,templateConfig,callback);
    })
  }
  return integrateComponents;
}

/* This method runs prior to the viewmodel being binded */
integrateComponents.overwriteLoadViewModel = function(func){
  _loadOrder.loadViewModel = function(name,templateConfig,callback){
    var args = arguments;
    ko.components.defaultLoader.loadViewModel(args[0],{createViewModel:function(params,componentInfo){
      /* Create ViewModel */
      var vm = new args[1](params,componentInfo.element);

      /* Create Module Class */
      var vc = vm.constructor();
      vc.viewmodel = vm;
      vc.node = componentInfo.element;

      /* attach to Element */
      componentInfo.element.KC = vc.call();
      func({target:componentInfo.element,view_model:vm});
      return vm;
    }},args[2])
  }
  return integrateComponents;
}

/******** COMPONENT LOADING ********/

/* returns a list of all unkown elements in a node */
integrateComponents.getUnkownElements = function(template){
  var reg = /(<\/(.*?)>)/g,
      matched = (template.match(reg) ? template.match(reg) : []);

  return matched.map(function(k,i){
    return k.substring(2,k.length-1);
  })
  .filter(function(k,i){
    return ((matched.indexOf(k,(i+1)) < 0 && document.createElement(k) instanceof HTMLUnknownElement));
  });
}

/* loads a component if it hasnt already been loaded */
integrateComponents.loadComponent = function(name,cb){
  if(!ko.components.isRegistered(name)){
      if(name.toLowerCase().indexOf('cms') < 0) kc.templates[name] = "";
      var query = kc.parseQuery(location.search),
      url = '/'+(name.toLowerCase().indexOf('cms') > -1 ? 'cms' : 'require')+'/'+name;
      url = (query.env !== undefined ? url+'?env='+query.env : url);
      url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);
      if(!require.defined(url)){
         require([url],function(){
           cb();
         },cb);
      }
    }
    else {
      cb();
    }
  return integrateComponents;
}

/* sets the bindings on a component if it hasnt already been set */
integrateComponents.setBinding = function(elements){
  elements = ((kc.isHTMLCollection(elements) || kc.isArray(elements)) ? elements : [elements]);
  for(var x=0;x<elements.length;x++){
    if(!elements[x].ko_override && !!ko.dataFor(elements[x])){
      ko.applyBindings({},elements[x]);
    }
  }
  return integrateComponents;
}

/* parses a template or node's children for components needing loaded */
integrateComponents.parseNodeTemplate = function(type,node,cb){
  var template = (typeof node === 'string' ? node : String.call("",node.innerHTML)),
      unkownElements = integrateComponents.getUnkownElements(template),
      loadCount = 0;

  function checkLoadCount(){
    if(loadCount >= unkownElements.length){
      if(cb) cb();
      return true;
    }
  }

  if(checkLoadCount()) return;

  unkownElements.forEach(function(tag){
    if(!ko.components.isRegistered(tag)){
      integrateComponents.loadComponent(tag,function(err){
        if(!err){
          loadCount += 1;
          checkLoadCount();
          if(type === 'html' || type === 'append'){
            integrateComponents.setBinding(node.getElementsByTagName(tag));
          }
        }
        else{
          console.error('Error loading component: ',tag);
        }
      });
    }
    else{
      loadCount += 1;
      checkLoadCount();
      if(type === 'html' || type === 'append'){
        integrateComponents.setBinding(node.getElementsByTagName(tag));
      }
    }
  });
  return integrateComponents;
}

/* iterates through the element and elements parents till it finds a component */
integrateComponents.getNearestComponent = function(node){
  var loop = true;

  while(loop){
    if((node instanceof HTMLUnknownElement)){
      loop = false;
      break;
    }
    else if(node.className && (node.className.indexOf('page_holder') > -1)){
      loop = false;
      break;
    }
    else if(node.parentElement === null){
      loop = false;
      break;
    }
    node = node.parentElement;
  }
  return node;
}

/* takes a css text such as file or style element text and returns object of rules */
integrateComponents.parseCSS = function(cssString,iterator){
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
        if(typeof iterator === 'function'){
          iterator({selector:r[0].replace(/\s/g,''),rule:k.substring(0,k.indexOf(':')).replace(/\s/g,''),value:k.substring((k.indexOf(':')+1),k.indexOf(';'))});
        }
        return ro;
      },{}));
      return o;
    },{})
  }


define([],function(){return integrateComponents});
define('integrateComponents',function(){return integrateComponents;});
