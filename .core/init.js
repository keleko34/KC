define(['./override', './router'],function(override, router){

  override.loader();
  /* Here we should require the main page Header, Content, Footer */
  require(['Sections/Upload/Upload'],function(Upload){
    ko.applyBindings(router.bindings)
  });
});
