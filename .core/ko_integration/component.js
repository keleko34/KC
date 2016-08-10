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
      if(e.value.indexOf('ignore') < 0){
        integrateComponents.parseNodeTemplate('html',e.target);
      }
    });
  });

  kb.addAttrUpdateListener('appendChild',function(e){
    var node = integrateComponents.getNearestComponent(e.target);

    if(node.ko_override.postappend) integrateComponents.parseNodeTemplate('append',node);

    node.ko_override.postappend = true;
  });

  ko.component.loaders.unshift(_loadOrder);
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
      ko.components.defaultLoader.getConfig.apply(self,args);
    });
  }
  return integrateComponents;
}

/* This method runs after the viewmodel and the template are fetched for the component */
integrateComponents.overwriteLoadComponent = function(func){
  _loadOrder.loadComponent = function(){
    func.apply(this,arguments);
    ko.components.defaultLoader.loadComponent.apply(this,arguments);
  }
  return integrateComponents;
}

/* This method runs prior to insert of the template */
integrateComponents.overwriteLoadTemplate = function(func){
  _loadOrder.loadTemplate = function(name,templateConfig,callback){
    if(typeof templateConfig !== 'string') callback(null);
    var self = this,
        args = arguments;

    func(name,templateConfig,function(){
      ko.components.defaultLoader.loadTemplate.apply(self,args);
    })
  }
  return integrateComponents;
}

/* This method runs prior to the viewmodel being binded */
integrateComponents.overwriteLoadViewModel = function(func){
  _loadOrder.loadViewModel = function(){
    ko.components.defaultLoader.loadViewModel(arguments[0],{createViewModel:function(params,componentInfo){
      var vm = func({target:componentInfo.element,view_model:arguments[1]})
      componentInfo.element.ko_viewmodel = (isObject(vm) ? vm : new arguments[1](params,componentInfo.element));
      return componentInfo.element.ko_viewmodel;
    },arguments[2]})
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
    return (matched.indexOf(k,(i+1)) < 0);
  });
}

/* loads a component if it hasnt already been loaded */
integrateComponents.loadComponent = function(name){
  if(!ko.components.isRegistered(name)){
      var query = parse_query(location.search),
      url = '/'(name.toLowerCase().indexOf('cms') > -1 ? 'cms' : 'require')'/'+name;
      url = (query.env !== undefined ? url+'?env='+query.env : url);
      url = (query.debug !== undefined ? url+((query.env !== undefined ? '&' : '?')+'debug='+query.debug) : url);
      if(!require.defined(url)){
         require([url],function(){
           cb();
         },function(err){console.error(name,' does not exist');});
      }
    }
    else {
      cb();
    }
  return integrateComponents;
}

/* sets the bindings on a component if it hasnt already been set */
integrateComponents.setBinding = function(elements){
  elements = (isArray(elements) ? elements : [elements]);
  for(var x=0;x<elements.length;x++){
    if(!elements[x].ko_override){
      ko.applyBindings({},elements[x]);
    }
  }
  return integrateComponents;
}

/* parses a template or node's children for components needing loaded */
integrateComponents.parseNodeTemplate = function(type,node,cb){
  var template = (typeof node === 'string' ? node : new String(node.innerHTML)),
      unkownElements = integrateComponents.getUnkownElements(template),
      loadCount = 0;

  function checkLoadCount(){
    if(loadCount >= unkownElements.length){
      if(cb) cb();
    }
  }

  unkownElements.forEach(function(tag){
    if(!ko.components.isRegistered(tag)){
      unkownElements.loadComponent(tag,function(err){
        if(!err){
          loadCount += 1;
          checkLoadCount();
          if(type === 'html' || type === 'append'){
            integrateComponents.setBindin(node.getElementsByTagName(tag));
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
        integrateComponents.setBindin(node.getElementsByTagName(tag));
      }
    }
  });
  return integrateComponents;
}

/* iterates through the element and elements parents till it finds a component */
integrateComponents.getNearestComponent = function(node){
  while(!(node instanceof HTMLUnknownElement) && node.parentElement !== null){
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
