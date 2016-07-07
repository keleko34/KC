// This module configures crossroads.js, a routing library. If you prefer, you
// can use any other routing library (or none at all) as Knockout is designed to
// compose cleanly with external libraries.
//
// You *don't* have to follow the pattern established here (each route entry
// specifies a 'page', which is a Knockout component) - there's nothing built into
// Knockout that requires or even knows about this technique. It's just one of
// many possible ways of setting up client-side routes.

define(['crossroads','hasher','text!routes.json'],function(crossroads,hasher,routes){
  routes = JSON.parse(routes);
  function Router(config){
    var self = this,
        keys = Object.keys(config);

    this.routes = config;
    this.bindings = {};

    Object.keys(routes).forEach(function(k,i){
      self.bindings[k] = ko.observable(self.fetchRoute(k,''));
    });

    // Configure Crossroads route handlers
    keys.forEach(function(key,i){
      var conf = config[key],
          observer = self.bindings[key];


        conf.forEach(function(route,x){

          /* Set initial page if not set */
          if(route.url.length < 1){
            observer(route.params);
          }

          crossroads.addRoute(route.url, function(requestParams){
              self.filterRoutes(key,route.url,function(keyRoute,keyName){
                  if(keyRoute){
                    self.bindings[keyName](ko.utils.extend(requestParams, keyRoute.params));
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
});
