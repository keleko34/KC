define([],function(){
  var _toggle = false,
      _onToggle = [];
  kc.CMS = function(){

  }

  kc.CMS.type = 'none';

  kc.CMS.start = function(){
    integrateComponents.loadComponent('Edit_Login',function(err){
      if(!err){
        var el = document.createElement('Edit_Login');
        document.body.appendChild(el);
        ko.applyBindings({},el);
      }
    })

    function attachCMSComponents(){

    }
  }

  kc.CMS.addToggleListener = function(){

  }

  kc.CMS.toggle = function(toggle){
    _toggle = (toggle === undefined ? !_toggle : toggle);

  }
  return kc.CMS;
});
