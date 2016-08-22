/*********************************
 *  CMS_Edit_Login
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_Edit_Login:register_CMS_Edit_Login
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_Edit_Login:register_CMS_Edit_Login
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_Edit_Login(CreateCMS_Edit_Login,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_Edit_Login',[],function(){return CreateCMS_Edit_Login});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_Edit_Login;
  }
  viewmodel.prototype.constructor = CreateCMS_Edit_Login;
  if(ko && !ko.components.isRegistered(('CMS_Edit_Login').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_Edit_Login').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
