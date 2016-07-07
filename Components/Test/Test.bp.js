/*********************************
 *  Test
 *  Created by Me
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_Test:register_Test
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_Test:register_Test
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_Test(CreateTest,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('CreateTest',[],function(){return CreateTest});
    define([],function(){return CreateTest;});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateTest;
  }
  viewmodel.prototype.constructor = CreateTest;
  if(ko && !ko.components.isRegistered(('Test').toLowerCase())){
    ko.components.register(('Test').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
