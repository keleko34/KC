require(['./.core/ko/init', 'crossroads', 'hasher','kb','./.core/device'],function(CreateOverride, crossroads, hasher, CreateKB){

  kb = CreateKB();

  function router(){
    var routes = page_routes;
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
  ko.punches.enableAll();

  kc.override = CreateOverride().call();

  ko.applyBindings(router().bindings);
});
