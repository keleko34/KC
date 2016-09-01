/*********************************
 *  grid
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_grid:register_grid
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_grid:register_grid
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_grid(Creategrid,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Creategrid',[],function(){return Creategrid});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Creategrid;
  }
  viewmodel.prototype.constructor = Creategrid;
  if(ko && !ko.components.isRegistered(('grid').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('grid').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
