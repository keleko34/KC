/*********************************
 *  PhotoPost
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_PhotoPost:register_PhotoPost
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_PhotoPost:register_PhotoPost
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_PhotoPost(CreatePhotoPost,viewmodel,template){
  if(typeof define === 'function' && define.amd){
    define('CreatePhotoPost',[],function(){return CreatePhotoPost});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreatePhotoPost;
  }
  viewmodel.prototype.constructor = CreatePhotoPost;
  if(ko && !ko.components.isRegistered(('PhotoPost').toLowerCase())){
    ko.components.register(('PhotoPost').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
