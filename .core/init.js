require(['./.core/routes', 'crossroads', 'hasher'],function(routeConfig, crossroads, hasher){

  function override(){
    var element_routes = routeConfig.element_routes;

    function loadComponent(routes, callback){
      var query = routeConfig.parseQuery(location.search);

      routes.map(function(k,i){
        if(query.env !== undefined){
          return k+(k.indexOf('.js') > -1 ? '' : '.js')+'?env='+query.env;
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
          matched = template.match(reg).map(function(k,i){
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

    function searchComponents(check,callback){
      var elroutes = Object.keys(element_routes),
          routes = [];

      for(var x=0;x<elroutes.length;x++){
        var componentroutes = Object.keys(element_routes[elroutes[x]]);
        for(var i=0;i<componentroutes.length;i++){
          if(check(componentroutes[i])){
            routes.push(element_routes[elroutes[x]][componentroutes[i]]);
          }
        }
      }
      callback(routes);
    }

    /* This overrides the components loader so that an element is attached the viewmodel and the viewmodel is atached to the element */
    ko.components.loaders.unshift({
      getConfig: function(name, callback) {
        if(!ko.components.isRegistered(name)){

          searchComponents(function(component){
            return component === name;
          },function(routes){
            if(routes.length > 0){
              loadComponent(routes,function(){
                ko.components.defaultLoader.getConfig(name, callback);
              });
            }
            else{
              console.error('You have not set the component path inside elements.config for ',name);
              ko.components.defaultLoader.getConfig(name, callback);
            }
          });
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
          searchComponents(function(component){
            return (templateConfig.indexOf('</'+component+'>') > -1 && !ko.components.isRegistered(component));
          },function(routes){
            if(routes.length > 0){
              loadComponent(routes,function(){
                ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
              });
            }
            else{
              ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
            }
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

  function router(){
    var routes = routeConfig.page_routes;
    function Router(config){
      var self = this,
          keys = Object.keys(config);

      this.routes = config;
      this.bindings = {};

      Object.keys(routes).forEach(function(k,i){
        self.bindings[k] = ko.observable(self.fetchRoute(k,'').params);
      });

      // Configure Crossroads route handlers
      keys.forEach(function(key,i){
        var conf = config[key],
            observer = self.bindings[key];


          conf.forEach(function(route,x){

            crossroads.addRoute(route.url, function(requestParams){

                self.filterRoutes(key,route.url,function(keyRoute,keyName){
                    if(keyRoute){
                      self.bindings[keyName](ko.utils.extend(JSON.parse(JSON.stringify(requestParams)), keyRoute.params));
                    }
                });
                observer(ko.utils.extend(requestParams, route.params));
            });
          });
      });

      crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
      hasher.initialized.add(hash => crossroads.parse(hash));
      hasher.changed.add(hash => crossroads.parse(hash));
      hasher.init();
    }

    Router.prototype.fetchRoute = function(type,url){
      for(var x=0;x<this.routes[type].length;x++){
        if(this.routes[type][x].url === url){
          return this.routes[type][x];
        }
      }
    }

    Router.prototype.filterRoutes = function(currentRoute,url,cb){
      var self = this;
      Object.keys(this.routes).filter(function(k,i){
        return k !== currentRoute;
      }).forEach(function(k,i){
        var route = self.fetchRoute(k,url);
        cb(route,k);
      })
    }


    // Create and export router instance
    return new Router(routes);
  }

  override();
  ko.applyBindings(router().bindings);
});
