/*********************************
 *  test_content
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_test_content:register_test_content
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_test_content:register_test_content
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_test_content(Createtest_content,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Createtest_content',[],function(){return Createtest_content});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createtest_content;
  }
  viewmodel.prototype.constructor = Createtest_content;
  if(ko && !ko.components.isRegistered(('test_content').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('test_content').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
