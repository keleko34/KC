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

    var rules = e.template.substring((e.template.indexOf('<style>')+"<style>".length),(e.template.indexOf('</style>')))
    .split(/(.*?{.*?})/g)
    .filter(function(r){
      return (r.length > 0 && (r !== '\r\n' && r !== '\n'));
    })
    .map(function(r){
      return r.split(/(.*?)({)(.*?)(})/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
    })
    .reduce(function(o,r){
      o[r[0].replace(/\s/g,'')] = (r.length < 4 ? "" : r[2].split(/(.*?:.*?;)/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
      .reduce(function(ro,k){
        k = k.substring(2,k.length)
        ro[k.substring(0,k.indexOf(':')).replace(/\s/g,'')] = k.substring((k.indexOf(':')+1),k.indexOf(';'));
        return ro;
      },{}));
      return o;
    },{})





  })
  .call();

  ExtenderOverride.call();

  return {
    ComponentOverride : ComponentOverride,
    ExtenderOverride : ExtenderOverride
  }
})
