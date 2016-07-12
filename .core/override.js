define([],function(){

  /* This overrides the components loader so that an element is attached the viewmodel and the viewmodel is atached to the element */
  function loader(){

    ko.components.loaders.unshift({
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
          var found = [],
              cb = function(){
                ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
              }
          Object.keys(element_routes).forEach(function(t,x){
            Object.keys(element_routes[t]).forEach(function(k,i){
              if(templateConfig.indexOf('</'+k+'>') > -1){
                if(!require.defined(element_routes[t][k])){
                    found.push(k);
                    require([element_routes[t][k]],function(vm){
                      found.splice(found.indexOf(k),1);
                      if(found.length < 1){
                        cb();
                      }
                    }, function(err){
                      console.log(element_routes[t][k],' does not exist in ',t, ' but is refrenced in its routes');
                    })
                }
              }
            });
          });
          if(found.length < 1){
            ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
          }
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
