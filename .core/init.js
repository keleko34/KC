define(['./override', './router'],function(override, router){

  override.loader();
  /* Here we should require the main page Header, Content, Footer */
  require([],function(){
    ko.applyBindings(router.bindings)
  });
});
