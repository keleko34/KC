/*********************************
 *  test_page_boxes
 *  Created by Keleko34
 *  This file is a blueprint that registers the
 *  component with requirejs, knockoutjs and commonjs
 ********************************/

/* This first part defines the register method when this file is called either from requirejs or commonjs */
if (typeof define === "function" && define.amd)
{
  define([],function(){
    return {
      register_test_page_boxes:register_test_page_boxes
    }
  });
}
else if (typeof module === "object" && module.exports)
{
    module.exports = {
      register_test_page_boxes:register_test_page_boxes
    }
}

/* This method is the method that will be put into the main file when it is compiled during dev build */
function register_test_page_boxes(Createtest_page_boxes,viewmodel,template,css){
  if(typeof define === 'function' && define.amd){
    define('Createtest_page_boxes',[],function(){return Createtest_page_boxes});
  }
  else if(typeof module === "object" && module.exports){
    module.exports = Createtest_page_boxes;
  }
  viewmodel.prototype.constructor = Createtest_page_boxes;
  if(ko && !ko.components.isRegistered(('test_page_boxes').toLowerCase())){
    template = "<style>\r\n"+css+"\r\n</style>"+template;
    ko.components.register(('test_page_boxes').toLowerCase(),{viewModel:viewmodel,template:template});
  }
}
