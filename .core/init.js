define(['./router'],function(router){
  require(['Components/ProgressBar/ProgressBar'],function(ProgressBar){
    ko.applyBindings({ route: router.currentRoute });
  })
});
