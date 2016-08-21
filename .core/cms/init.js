define(['./login','./settings','./modules'],function(login,settings,modules){

  kc.CMS.loadPercent = 0;

  kc.CMS = function(){

  }

  kc.CMS.load = function(){
    var h = false;
    for(var x=0;x<document.all.length;x++){
      var el = document.all[x];
      if(el.nodeName.toLowerCase() === 'body') h = true;
      if(h){
        if(el instanceof HTMLUnknownElement){
          kc.CMS.getElementModule(el.nodeName.toLowerCase(),el.KC);
        }
      }
    }
  }

  kc.CMS.getElementModule = function(name,KC){
    function attach(create_cmmodule){
      KC.CMS = create_cmmodule(KC.node);
    }

    if(!modules.isRegistered(name)){
      modules.load(name,function(create_cmmodule){
        attach(create_cmmodule);
      });
    }
    else{
      attach(modules(name));
    }
  }

  return kc.CMS;
})
