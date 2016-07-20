/*********************************
 *  _blank
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register__blank:register__blank
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register__blank:register__blank
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register__blank(Create_blank,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('Create_blank',[],function(){return Create_blank});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Create_blank;
  }
  viewmodel.prototype.constructor = Create_blank;
  if(ko && !ko.components.isRegistered(('_blank').toLowerCase())){
    ko.components.register(('_blank').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
