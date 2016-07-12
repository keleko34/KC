/*********************************
 *  $Name
 *  Created by $Author
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_$Name:register_$Name
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_$Name:register_$Name
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_$Name(Create$Name,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('Create$Name',[],function(){return Create$Name});
    define([],function(){return Create$Name;});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Create$Name;
  }
  viewmodel.prototype.constructor = Create$Name;
  if(ko && !ko.components.isRegistered(('$Name').toLowerCase())){
    ko.components.register(('$Name').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
