define(['knockout','./router'],function(ko,router){
  ko.applyBindings({ route: router.currentRoute });
});
