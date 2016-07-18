define([],function(){
    return function(){
      function parseQuery(qstr){
        var query = {},
            a = qstr.substr(1).split('&');

        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
      }

      function loadComponent(routes, callback){
        var query = parseQuery(location.search);

        routes.map(function(k,i){
          if(query.env !== undefined){
            k = k+'?env='+query.env;
          }
          if(query.debug !== undefined){
            k = k+(query.env !== undefined ? '&' : '?')+'debug='+query.debug;
          }
          return k;
        })
        .forEach(function(k,i){
            if(!require.defined(k)){
                require([k],function(vm){
                  routes.splice(routes.indexOf(k),1);
                  if(routes.length < 1){
                    callback();
                  }
                }, function(err){
                  console.log(k,' does not exist in but is refrenced in its routes');
                })
            }
        });
      }

      /* future parser */
      function parseComponents(template,callback){
        var reg = /(<\/(.*?)>)/g,
            matched = (template.match(reg) ? template.match(reg) : []).map(function(k,i){
              return k.substring(2,k.length-1);
            }),
            routes = [];

        for(var x=0;x<matched.length;x++){
          if(document.createElement(matched[x]) instanceof HTMLUnknownElement){
            if(!ko.components.isRegistered(matched[x])){
              routes.push('/require/'+matched[x]);
            }
          }
        }
        if(routes.length > 0){
          loadComponent(routes,callback);
        }
        else{
          callback();
        }
      }

      /* future page getter */
      function getPage(name,callback){
        var routes = [];
        if(!ko.components.isRegistered(name)){
          routes.push('/require/'+name);
        }

        if(routes.length > 0){
          loadComponent(routes,callback);
        }
        else{
          callback();
        }
      }

      /* So we can keep the text content inside */
      ko.bindingHandlers.component._init = ko.bindingHandlers.component.init;
      ko.bindingHandlers.component.init = function(params){
        params.bindingText = params.textContent;
        return ko.bindingHandlers.component._init.apply(this,arguments);
      }

      /* This overrides the components loader so that an element is attached the viewmodel and the viewmodel is atached to the element */
      ko.components.loaders.unshift({
        getConfig: function(name, callback) {
          if(!ko.components.isRegistered(name)){
              getPage(name,function(){
                ko.components.defaultLoader.getConfig(name, callback);
              })
          }
          else{
            ko.components.defaultLoader.getConfig(name, callback);
          }
        },
        loadViewModel: function (name, viewModelConfig, callback) {
          if (typeof viewModelConfig === "function") {
            var viewModelConstructor = {
              createViewModel: function (params, componentInfo) {
                componentInfo.element.KViewModel = new viewModelConfig(params, componentInfo.element);
                if(componentInfo.element.KViewModel.methods.content !== undefined){
                  if(componentInfo.element.bindingText.length > 0){
                    componentInfo.element.KViewModel.methods.content(componentInfo.element.bindingText);
                    componentInfo.element.KViewModel.methods();
                  }
                }
                return componentInfo.element.KViewModel;
              }
            };
            ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
          } else {
            callback(null);
          }
        },
        loadTemplate: function (name, templateConfig, callback) {
          if (typeof templateConfig === 'string'){
            parseComponents(templateConfig,function(){
              ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
            });
          } else if (templateConfig.fromUrl) {
            require(['text!'+templateConfig.fromUrl],function(cp){
              ko.components.defaultLoader.loadTemplate(name, cp, callback);
            });
          } else {
            callback(null);
          }
        }
      });
    }
})
