define([],function(){

  function loadComponent(routes, callback){
    var query = parseQuery(location.search);

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
  function loader(){
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

  return {
    loader:loader
  }
})
