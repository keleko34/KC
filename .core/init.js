define(['./router'],function(router){
  ko.applyBindings({ route: router.currentRoute });
});
