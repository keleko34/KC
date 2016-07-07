/* This first part defines the register method when this file is called
 * either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_$Name:function(Create$Name,viewmodel,template){
        define('Create$Name',[],function(){return Create$Name});
        define([],function(){return Create$Name;});
        viewmodel.prototype.constructor = Create$Name;
        if(ko && !ko.components.isRegistered(('$Name').toLowerCase())){
          ko.components.register(('$Name').toLowerCase(),{viewModel:viewmodel,template:template});
        }
      }
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_$Name:function(Create$Name,viewmodel,template){
        module.exports = Create$Name;
        viewmodel.prototype.constructor = Create$Name;
        if(ko && !ko.components.isRegistered(('$Name').toLowerCase())){
          ko.components.register(('$Name').toLowerCase(),{viewModel:viewmodel,template:template});
        }
      }
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
