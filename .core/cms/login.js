define([],function(){

  kc.CMS.login = function(){

  }

  kc.CMS.login.appendLogin = function(){
    integrateComponents.loadComponent('Edit_Login',function(err){
      if(!err){
        var el = document.createElement('Edit_Login');
        document.body.appendChild(el);
        ko.applyBindings({},el);
      }
    })
  }

  return kc.CMS.login;
});
