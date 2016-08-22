define([],function(){

  kc.CMS.login = function(){

  }

  kc.CMS.login.appendLogin = function(){

    function append(){
      integrateComponents.loadComponent('Edit_Login',function(err){
        if(!err){
          var el = document.createElement('Edit_Login');
          document.body.appendChild(el);
          ko.applyBindings({},el);
        }
      })
    }

    var ls = localStorage.getItem('cms_l');

    if(!ls){
      append();
    }
    else{
      ls = JSON.parse(ls);
      function response(data){
        data = JSON.parse(data);
        if(data.err){
          append();
        }
        else if(data.success){
          kc.CMS.settings.userType = data.type;
          kc.CMS.loggedIn = true;
          kc.CMS.load();
        }
      }

      function url(url){
        return '/'+url+'/?'+location.search.replace('?','')+'&user='+ls.u+'&pass='+ls.p;
      }

      if(io && io.socket && io.socket.post){
        io.socket.post(Edit_Login.url('cms_login'),{},response);
      }
      else{
        var io = new XMLHttpRequest();
        io.onreadystatechange = function(e){
          if(io.readyState === 4 && io.status === 200){
            response(io.responseText);
          }
        }
        io.open("POST", url('cms_login'), true);
        io.send();
      }
    }
  }

  return kc.CMS.login;
});
