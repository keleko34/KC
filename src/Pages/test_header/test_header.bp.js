/*********************************
 *  test_header
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_test_header:register_test_header
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_test_header:register_test_header
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_test_header(Createtest_header,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Createtest_header',[],function(){return Createtest_header});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createtest_header;
  }
  viewmodel.prototype.constructor = Createtest_header;
  if(ko && !ko.components.isRegistered(('test_header').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('test_header').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}