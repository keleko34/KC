/*********************************
 *  _test
 *  Created by keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register__test:register__test
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register__test:register__test
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register__test(Create_test,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('Create_test',[],function(){return Create_test});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Create_test;
  }
  viewmodel.prototype.constructor = Create_test;
  if(ko && !ko.components.isRegistered(('_test').toLowerCase())){
    ko.components.register(('_test').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
