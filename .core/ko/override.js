define([],function(){

  /* All text properties */
  var _htmlEvents = ['innerHTML','outerHTML','textContent','innerText','outerText'],

    /* standard attributes, more can be added except id and class and style */
    _attrEvents = ['title','href','value','src'],

    /* list of all possible events on an element */
    _bindEvents = Object.keys(HTMLElement.prototype).filter(function(k){return (k.indexOf('on')  === 0);});


  function override(){

    /* loaders and their order */
    ko.components.loaders.unshift({
      getConfig:getConfig,
      loadComponent:loadComponent,
      loadTemplate:loadTemplate,
      loadViewModel:loadViewModel
    });

    var _init = ko.bindingHandlers.component.init;
    ko.bindingHandlers.component = {
      init:initComponent,
      update:ko.bindingHandlers.component.update,
      preprocess:ko.bindingHandlers.component.preprocess
    }

    var _update = ko.bindingHandlers.html.update;
    ko.bindingHandlers.html = {
      init:initHtml,
      update:updateHTML,
      preprocess:ko.bindingHandlers.html.preprocess
    }

    /* first stage, loads the component if it doesnt exist */
    function getConfig(name,callback){
      override.load(name,function(){
        ko.components.defaultLoader.getConfig(name,callback);
      })
    }

    /* second stage, we attach the template as a prototype to the viewmodel for later editing */
    function loadComponent(name, componentConfig, callback){
      /* for later use when we want to update its template */
      if(!componentConfig.viewModel.prototype.template){
        componentConfig.viewModel.prototype.template = ko.observable(componentConfig.template);
      }
      ko.components.defaultLoader.loadComponent(name, componentConfig, callback);
    }

    /* third stage, we load any sub components needing loaded */
    function loadTemplate(name,template,callback){
      override.loadFromTemplate(template,function(){
        ko.components.defaultLoader.loadTemplate(name, template, callback);
      });
    }

    /* last stage, most important as we setup the chain and get parent attr's */
    function loadViewModel(name,viewmodelConfig,callback){
      ko.components.defaultLoader.loadViewModel(name,{
        createViewModel:function(params,config){
          /* Create ViewModel */
          var viewmodel = new viewmodelConfig(params,config.element),
              /* Create Module Class */
              module = viewmodel.constructor(),
              element = config.element,

              /* get parent Attributes and attach to module and viewmodel */
              parentBinds = override.fetchBindableAttributes(element),
              css = element.querySelector('style');
          parentBinds.push({name:'innerHTML',value:element.ko_override.html});

          element.KC = module;
          element.KC.viewmodel = viewmodel;
          element.KC.template = viewmodel.template;
          element.KC.node = element;
          element.KC.cssText = (css ? css.textContent : "");
          element.KC.css = (css ? kc.parseCSS(css.textContent) : {});
          element.KC.templateNodes = config.templateNodes;
          element.KC.childRenderers = [];
          element.KC.parentRenderer = override.getParentModule(element);
          element.KC.onCompleteChildRender = function(){
            this._main();
            if(element.KC.parentRenderer && element.KC.parentRenderer.KC){
              element.KC.parentRenderer.KC.onCompleteChildRender();
            }
          }

          for(var x=0;x<parentBinds.length;x++){
            override.addToModule(module,parentBinds[x].name,parentBinds[x].value)
            .addToViewModel(viewmodel,parentBinds[x].name,module[parentBinds[x].name]());
          }

          override.watch(element,module,viewmodel);

          element.KC();

          var viewKeys = Object.keys(element.KC.viewmodel);
          for(var x=0;x<viewKeys.length;x++){
            if(ko.isObservable(element.KC.viewmodel[viewKeys[x]])){
              (function(key){
                element.KC.viewmodel[key].subscribe(function(val){
                  if(element.KC[key.replace('_binding','')] && element.KC[key.replace('_binding','')].isMethod && !element.KC[key.replace('_binding','')].isMethod()){
                    element.KC[key.replace('_binding','')](val);
                  }
                });
              }(viewKeys[x]))
            }
          }

          if(kc.CMS.isAuth && name.toLowerCase().indexOf('cms') !== 0) element.appendChild(document.createElement('CMS_'+name));

          if(element.KC && (element.KC.innerHTML().length === 0) || (override.getUnkownElements(element.innerHTML).length === 0 && element.innerHTML.indexOf('{{innerhtml_binding}}') < 0)){
            element.KC.onCompleteChildRender();
          }

          return element.KC.viewmodel;
        }
      },callback);
    }

    function initHtml(){
      return { 'controlsDescendantBindings': true };
    }

    function updateHTML(element, valueAccessor, allBindings, viewModel, bindingContext){
      var val = ko.utils.unwrapObservable(valueAccessor());
      override.loadFromTemplate(""+val,function(){
        //ko.utils.setHtml(element,valueAccessor());
        if (element.nodeType === 8) {
          ko.virtualElements.setDomNodeChildren(element,ko.utils.parseHtmlFragment(""+val));
        }
        else{
          ko.utils.setHtml(element,valueAccessor());
        }
        ko.applyBindingsToDescendants(bindingContext,element);
        var node = (!(element instanceof HTMLUnknownElement) ? override.getParentModule(element) : element),
            unkown = override.getUnkownElements(node.innerHTML);
        var nodes = [];
        for(var x=0;x<unkown.length;x++){
          nodes.concat(node.querySelectorAll(unkown[x]));
        }
        if(node.KC) node.KC.childRenderers = nodes;
        if(node.KC && unkown.length === 0){
          node.KC.onCompleteChildRender();
        }
      })
    }

    function initComponent(element, valueAccessor, allBindings, viewModel, bindingContext){
      //override.callParents(element);
      element.ko_override = {html:element.innerHTML};
      _init(element, valueAccessor, allBindings, viewModel, bindingContext);
    }

    kb.addAttrListener('innerHTML',function(e){
      if(e.value.indexOf('ignore') !== 0){
        /*var node = override.getClosestNode(e.target);
        if(node !== null && node !== undefined){
          //we need to update template here
        }*/
      }
    })
    .addAttrUpdateListener('innerHTML',function(e){
      if(e.value.indexOf('ignore') !== 0 && override.getUnkownElements(e.value).length > 0){
        console.log(e.value);
        override.loadFromTemplate(e.value,function(){
          ko.cleanNode(e.target);
          ko.applyBindingsToNode({},e.target);
          ko.applyBindingsToDescendants({},e.target);
        })
      }
    })
    .addAttrUpdateListener('appendChild',function(e){
      if((!(e.target instanceof HTMLUnknownElement) || e.arguments[0].nodeName.toLowerCase().indexOf('cms') === 0) && (e.target.className.indexOf('page_holder') < 0)  && (e.arguments[0] instanceof HTMLUnknownElement)){
        override.load(e.arguments[0].tagName.toLowerCase(),function(){
          ko.cleanNode(e.arguments[0]);
          ko.applyBindings({},e.arguments[0]);
        });
      }
      else{
        var node = override.getParentModule(e.arguments[0]);
        if(node && node.KC){
          node.KC.onCompleteChildRender();
        }
      }
    })
    .addAttrListener('removeChild',function(e){
      if(e.arguments[0] instanceof HTMLUnknownElement){
        ko.cleanNode(e.arguments[0]);
      }
    })

    return override;
  }

  /* loads a single component or an array of components */
  override.load = function(components,cb){
    if(!kc.isArray(components)) components = [components];
    var count = 0;
    function getCount(){
      count += 1;
      if(count >= components.length){
        cb();
      }
    }
    if(components.length < 1) getCount();

    for(var x=0;x<components.length;x++){
      components[x] = components[x].toLowerCase();
      if(!ko.components.isRegistered(components[x])){
        var url = '/'+(components[x].indexOf('cms') > -1 ? 'cms' : 'require')+'/'
        kc.require(url+components[x],location.search,getCount);
      }
      else{
        getCount();
      }
    }
  }

  /* takes a template and loads the components in it */
  override.loadFromTemplate = function(template,cb){
    var unkownElements = override.getUnkownElements(template);
    override.load(unkownElements,cb);
    return override;
  }

  /* parses html and returns a list of components */
  override.getUnkownElements = function(template){
    var reg = /(<\/(.*?)>)/g,
        matched = (template.match(reg) ? template.match(reg) : [])
        .map(function(k,i){
          return k.substring(2,k.length-1).toLowerCase();
        });

    return matched.filter(function(k,i){
      return ((matched.indexOf(k,(i+1)) === -1 && document.createElement(k) instanceof HTMLUnknownElement));
    });
  }

  /* fetches all bindable attributes on an element */
  override.fetchBindableAttributes = function(el){
    return _attrEvents.concat(_bindEvents)
    .concat(kc.getAttributes(el))
    .map(function(attr){
      var obj = {name:attr,value:(el.getAttribute(attr) ? (attr.indexOf('on') === 0 ? (eval('(function(e){'+el.getAttribute(attr)+'})')) : el.getAttribute(attr)) : el[attr])};
      if(el.getAttribute(attr)) el.removeAttribute(attr);
      if(_htmlEvents.indexOf(attr) < 0 && attr !== 'title') el[attr] = undefined;
      return obj;
    });
  }

  /* adds a new method to the module specified */
  override.addToModule = function(module,name,value){
    if(module[name] === undefined){
      module.add({
        name:name,
        type:(!isNaN(parseInt(value,10)) ? 'number' : (kc.isArray(value) ? 'array' : typeof value)),
        value:value
      });
    }
    else if(module[name].isMethod && !module[name].isMethod()){
      module[name](value);
    }
    else{
      console.error('Failed to load to module ',module,' the property ',name,' from parentElement, please see Your module definitions');
    }
    return override;
  }

  /* adds a new observable to the viewmodel specified */
  override.addToViewModel = function(viewmodel,name,value){
    name = name+"_binding"
    if(viewmodel[name] === undefined){
      if(name.indexOf('on') === 0){
        viewmodel[name] = value;
      }
      else{
        viewmodel[name] = ko.observable(value);
      }
    }
    else{
      if(ko.isObservable(viewmodel[name])){
        viewmodel[name](value);
      }
      else{
        viewmodel[name] = value;
      }
    }
    return override;
  }

  /* watches a desired element for changes and applies the changes to the supplied module and viewmodel  */
  override.watch = function(el,module,viewmodel){
    var _allEvents = _htmlEvents.concat(_attrEvents).concat(_bindEvents);

    for(var x=0;x<_allEvents.length;x++){
      el.addAttrListener(_allEvents[x],function(e){
        e.preventDefault();
        if(_htmlEvents.indexOf(e.attr) > -1){
          override.loadFromTemplate(e.value,function(){
            override.addToModule(module,e.attr,e.value)
            .addToViewModel(viewmodel,e.attr,module[e.attr]());
          })
        }
        else{
          override.addToModule(module,e.attr,e.value)
          .addToViewModel(viewmodel,e.attr,module[e.attr]());
        }
      });
    }

    el.addAttrListener('setAttribute',function(e){
      e.preventDefault();
      override.addToModule(module,e.attr,e.value)
      .addToViewModel(viewmodel,e.attr,module[e.attr]());
    })
    .addAttrListener('appendChild',function(e){
      if(e.arguments[0].nodeName.toLowerCase().indexOf('cms') !== 0){
        e.preventDefault();
        e.target.KC.innerHTML(e.target.KC.innerHTML()+e.arguments[0].outerHTML).call();
      }
    });

    return override;
  }

  override.getClosestNode = function(element){
    return (!(element instanceof HTMLUnknownElement) ? override.getParentModule(element) : element);
  }

  override.getParentModule = function(element){
    var node = element.parentElement;
    while(node && !(node instanceof HTMLUnknownElement) && (node.className.indexOf('page_holder') < 0)){
      node = node.parentElement;
    }
    return node;
  }

  override.callParents = function(el){
    while(el && el.nodeName.toLowerCase() !== 'body'){
      if(el.KC) el.KC._main();
      el = el.parentElement;
    }
  }

  return override;
})
