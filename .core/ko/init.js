define(['./component','./binding','./extenders'],function(CreateComponentOverride,CreateBindingOverride,CreateExtendersOverride){
  var ComponentOverride = CreateComponentOverride(),
      BindingOverride = CreateBindingOverride(),
      ExtenderOverride = CreateExtendersOverride();

  kc.addListener('viewmodel',BindingOverride.inject).call();
  return {
    ComponentOverride : ComponentOverride,
    BindingOverride : BindingOverride,
    ExtenderOverride : ExtenderOverride
  }
})
