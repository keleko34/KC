/*********************************
 *  CMS_Global_Settings
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_Global_Settings:register_CMS_Global_Settings
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_Global_Settings:register_CMS_Global_Settings
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_Global_Settings(CreateCMS_Global_Settings,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_Global_Settings',[],function(){return CreateCMS_Global_Settings});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_Global_Settings;
  }
  viewmodel.prototype.constructor = CreateCMS_Global_Settings;
  if(ko && !ko.components.isRegistered(('CMS_Global_Settings').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_Global_Settings').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
