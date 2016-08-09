/*********************************
 *  CMS_ComponentsListItem
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_ComponentsListItem:register_CMS_ComponentsListItem
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_ComponentsListItem:register_CMS_ComponentsListItem
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_ComponentsListItem(CreateCMS_ComponentsListItem,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_ComponentsListItem',[],function(){return CreateCMS_ComponentsListItem});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_ComponentsListItem;
  }
  viewmodel.prototype.constructor = CreateCMS_ComponentsListItem;
  if(ko && !ko.components.isRegistered(('CMS_ComponentsListItem').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_ComponentsListItem').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
