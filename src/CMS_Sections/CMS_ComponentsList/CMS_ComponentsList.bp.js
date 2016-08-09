/*********************************
 *  CMS_ComponentsList
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_ComponentsList:register_CMS_ComponentsList
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_ComponentsList:register_CMS_ComponentsList
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_ComponentsList(CreateCMS_ComponentsList,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_ComponentsList',[],function(){return CreateCMS_ComponentsList});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_ComponentsList;
  }
  viewmodel.prototype.constructor = CreateCMS_ComponentsList;
  if(ko && !ko.components.isRegistered(('CMS_ComponentsList').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_ComponentsList').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
