/*********************************
 *  CMS_Grid
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_CMS_Grid:register_CMS_Grid,
      get_CMS_Grid:get_CMS_Grid
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_CMS_Grid:register_CMS_Grid,
      get_CMS_Grid:get_CMS_Grid
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_CMS_Grid(CreateCMS_Grid,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('CreateCMS_Grid',[],function(){return CreateCMS_Grid});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = CreateCMS_Grid;
  }
  viewmodel.prototype.constructor = CreateCMS_Grid;
}

function get_CMS_Grid(template){
  var elements = [],
      name = 'CMS_Grid'.replace('CMS_','').toLowerCase();
  for(var x=0;x<document.all.length;x++){
    if(document.all[x].tagName.toLowerCase() === name){
      elements.push(document.all[x]);
    }
  }



}
