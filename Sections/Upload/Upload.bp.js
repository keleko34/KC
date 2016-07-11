/*********************************
 *  Upload
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_Upload:register_Upload
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_Upload:register_Upload
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_Upload(CreateUpload,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('CreateUpload',[],function(){return CreateUpload});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateUpload;
  }
  viewmodel.prototype.constructor = CreateUpload;
  if(ko && !ko.components.isRegistered(('Upload').toLowerCase())){
    ko.components.register(('Upload').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
