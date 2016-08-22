/*********************************
 *  CMS_test_button
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_test_button:register_CMS_test_button
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_test_button:register_CMS_test_button
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_test_button(CreateCMS_test_button,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_test_button',[],function(){return CreateCMS_test_button});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_test_button;
  }
  viewmodel.prototype.constructor = CreateCMS_test_button;
  if(ko && !ko.components.isRegistered(('CMS_test_button').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('CMS_test_button').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
