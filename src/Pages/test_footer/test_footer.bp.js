/*********************************
 *  test_footer
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_test_footer:register_test_footer
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_test_footer:register_test_footer
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_test_footer(Createtest_footer,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Createtest_footer',[],function(){return Createtest_footer});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createtest_footer;
  }
  viewmodel.prototype.constructor = Createtest_footer;
  if(ko && !ko.components.isRegistered(('test_footer').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('test_footer').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
