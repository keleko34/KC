define(['./override', './router'],function(override, router){

  override.loader();
  /* Here we should require the main page Header, Content, Footer */
  require(['Components/ProgressBar/ProgressBar'],function(ProgressBar){
    ko.applyBindings(router.bindings)
  });
});
