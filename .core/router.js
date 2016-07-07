// This module configures crossroads.js, a routing library. If you prefer, you
// can use any other routing library (or none at all) as Knockout is designed to
// compose cleanly with external libraries.
//
// You *don't* have to follow the pattern established here (each route entry
// specifies a 'page', which is a Knockout component) - there's nothing built into
// Knockout that requires or even knows about this technique. It's just one of
// many possible ways of setting up client-side routes.

define(['crossroads','hasher','./routes'],function(crossroads,hasher,routes){
  function Router(config){
    this.currentRoute = ko.observable({});

    // Configure Crossroads route handlers
    ko.utils.arrayForEach(config.Pages, (function(route){
        crossroads.addRoute(route.url, (function(requestParams){
            this.currentRoute(ko.utils.extend(requestParams, route.params));
        }).bind(this));
    }).bind(this));

    // Activate Crossroads
    crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
    hasher.initialized.add(hash => crossroads.parse(hash));
    hasher.changed.add(hash => crossroads.parse(hash));
    hasher.init();
  }

  // Create and export router instance
  return new Router(routes);
});
