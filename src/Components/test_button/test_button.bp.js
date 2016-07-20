/*********************************
 *  test_button
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_test_button:register_test_button
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_test_button:register_test_button
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_test_button(Createtest_button,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('Createtest_button',[],function(){return Createtest_button});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createtest_button;
  }
  viewmodel.prototype.constructor = Createtest_button;
  if(ko && !ko.components.isRegistered(('test_button').toLowerCase())){
    ko.components.register(('test_button').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
