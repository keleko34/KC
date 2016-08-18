/*********************************
 *  Edit_Login
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_Edit_Login:register_Edit_Login
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_Edit_Login:register_Edit_Login
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_Edit_Login(CreateEdit_Login,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateEdit_Login',[],function(){return CreateEdit_Login});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateEdit_Login;
  }
  viewmodel.prototype.constructor = CreateEdit_Login;
  if(ko && !ko.components.isRegistered(('Edit_Login').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('Edit_Login').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
