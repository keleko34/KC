define([],function(){

  var _isToggled = false,
      _onToggle = [];

  kc.CMS.settings = function(){

    /* Setup Defaults */

  }

  kc.CMS.settings.userType = 'none';

  kc.CMS.settings.toggle = function(v){
    _isToggled = (v !== undefined ? !!v : !_isToggled);
    return kc.CMS.settings;
  }

  kc.CMS.settings.addToggleListener = function(func){
    if(typeof func === 'function'){
      _onToggle.push(func);
    }
    return kc.CMS.settings;
  };

  kc.CMS.settings.removeToggleListener = function(func){
    if(typeof func === 'function'){
      loop:for(var x=0;x<_onToggle.length;x++){
        if(_onToggle[x].toString() === func.toString()){
          _onToggle.splice(x,1);
          break loop;
        }
      }
    }
    return kc.CMS.settings;
  }


  return kc.CMS.settings;
});
