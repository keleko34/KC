define(['./modularizer','./override','./extenders'],function(CreateModularizer, CreateOverride, ExtenderOverride){

  function integrate(){
    CreateOverride.call();
    ExtenderOverride.call();
    return integrate;
  }

  integrate.bindings = CreateOverride;
  integrate.extender = ExtenderOverride;

  return integrate;
});
