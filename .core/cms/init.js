define(['./login','./settings'],function(login,settings){

  var _onload = [];

  kc.CMS.load = function(){
    var els = Array.prototype.slice.call(document.all).filter(function(el){
        return (el instanceof HTMLUnknownElement);
      });
    var loaded = [];

    function onLoad(curr,total,percent){
      _onload.forEach(function(f){
        f(percent,curr,total);
      });
    }

    function onLoaded(){
      loaded.push(true);
      onLoad(loaded.length,els.length,kc.getPercent(0,els.length,loaded.length));
    }

    for(var x=0;x<els.length;x++){
      var el = els[x];
      var cms_app = document.createElement('CMS_'+el.tagName.toLowerCase());
      cms_app.ko_override = {cms:{}};
      cms_app.ko_override.cms.node = el;
      cms_app.ko_override.cms.onloaded = onLoaded;

      el.appendChild(cms_app);
    }
  }

  kc.CMS.addLoadListener = function(func){
    if(typeof func === 'function'){
      _onload.push(func);
    }
    return kc.CMS;
  }

  return kc.CMS;
})
