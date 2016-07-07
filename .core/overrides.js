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
      }
    });

  }

  return {
    loader:loader
  }
})
