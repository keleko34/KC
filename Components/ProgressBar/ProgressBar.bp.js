/* This first part defines the register method when this file is called
 * either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_ProgressBar:register_ProgressBar
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_ProgressBar:register_ProgressBar
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_ProgressBar(CreateProgressBar,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('CreateProgressBar',[],function(){return CreateProgressBar});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateProgressBar;
  }
  viewmodel.prototype.constructor = CreateProgressBar;
  if(ko && !ko.components.isRegistered(('ProgressBar').toLowerCase())){
    ko.components.register(('ProgressBar').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
