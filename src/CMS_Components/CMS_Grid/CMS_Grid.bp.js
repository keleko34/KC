/*********************************
 *  CMS_Grid
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_Grid:register_CMS_Grid
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_Grid:register_CMS_Grid
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_Grid(CreateCMS_Grid,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_Grid',[],function(){return CreateCMS_Grid});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_Grid;
  }
  viewmodel.prototype.constructor = CreateCMS_Grid;
  if(ko && !ko.components.isRegistered(('CMS_Grid').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_Grid').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
