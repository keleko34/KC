/*********************************
 *  Grid
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_Grid:register_Grid
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_Grid:register_Grid
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_Grid(CreateGrid,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateGrid',[],function(){return CreateGrid});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateGrid;
  }
  viewmodel.prototype.constructor = CreateGrid;
  if(ko && !ko.components.isRegistered(('Grid').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('Grid').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
