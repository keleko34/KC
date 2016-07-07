define(['./override', './router'],function(override, router){

  override.loader();
  /* Here we should require the main page */
  require(['Components/ProgressBar/ProgressBar'],function(ProgressBar){
    ko.applyBindings({ route: router.currentRoute });
  })
});
