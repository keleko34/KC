define([],function(){

  var _Modules = {};

  kc.CMS.modules = function(name){
    return _Modules[name];
  }

  kc.CMS.modules.isRegistered = function(name){
    return (_Modules[name] !== undefined);
  }

  kc.CMS.modules.load = function(name,cb){
    require(['/cms/'+name],function(module){
      _Modules[name] = module;
      if(cb) cb(module);
    },function(err){
      console.error('CMS Module ', name, ' could not be loaded');
    })
  }

  return modules;
});
