define(['./component','./extenders', './binding', 'kb'],function(CreateComponentOverride, CreateExtendersOverride, CreateBindingOverride, CreateKB){
  kb = CreateKB();
  kb.call();

  var ComponentOverride = CreateComponentOverride(),
      ExtenderOverride = CreateExtendersOverride();

  ComponentOverride.addListener('init',function(e){
    e.target.ko_binder = CreateBindingOverride().injector(ExtenderOverride.extendUpdate)
    .addListener('element',function(e){
      e.target.ko_binds[e.key] = e.value;
      e.target.ko_binder.call(null,e.view_model,e.target);
    })
    .getDefaults(e.target);
  })
  .addListener('viewmodel',function(e){
    e.target.ko_binder.call(null,e.view_model,e.target);

    ExtenderOverride.addListener('update',e.target.ko_binder.update);
  })
  .addListener('template',function(e){

    /* Here we can control style reading for methods etc. */

    var rules = ComponentOverride.parseCss(e.template.substring((e.template.indexOf('<style>')+"<style>".length),(e.template.indexOf('</style>'))),function(e){
      /* iterator for each rule */
    });



  })
  .call();

  ExtenderOverride.call();

  return {
    ComponentOverride : ComponentOverride,
    ExtenderOverride : ExtenderOverride
  }
})
