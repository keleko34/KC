/*********************************
 *  edit_login
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_edit_login:register_edit_login
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_edit_login:register_edit_login
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_edit_login(Createedit_login,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Createedit_login',[],function(){return Createedit_login});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createedit_login;
  }
  viewmodel.prototype.constructor = Createedit_login;
  if(ko && !ko.components.isRegistered(('edit_login').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('edit_login').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
