/*********************************
 *  PhotoUpload
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_PhotoUpload:register_PhotoUpload
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_PhotoUpload:register_PhotoUpload
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_PhotoUpload(CreatePhotoUpload,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('CreatePhotoUpload',[],function(){return CreatePhotoUpload});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreatePhotoUpload;
  }
  viewmodel.prototype.constructor = CreatePhotoUpload;
  if(ko && !ko.components.isRegistered(('PhotoUpload').toLowerCase())){
    ko.components.register(('PhotoUpload').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
