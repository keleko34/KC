define(['./modularizer','./override','./extenders'],function(Createmodularizer, Createoverride, Createextenders){

  function integrate(){
    Createoverride.call();
    Createextenders.call();
    return integrate;
  }

  integrate.bindings = Createoverride;
  integrate.extender = Createextenders;

  return integrate;
})
