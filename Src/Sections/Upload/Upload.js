/*********************************
 *  Upload
 *  Created by Keleko34
 *  This section is for uploading files
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./Upload.bp', './Upload.vm', 'text!./Upload.html', 'css!./Upload.css'],function(blueprint, viewmodel, template){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function CreateUpload(){

      var vm = {};
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function Upload(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('Upload' + (_example ? ' Upload--'+_example : ''));
        */
        return Upload;
      }

      Upload.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return Upload;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   Upload.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return Upload;
         *   }
        */

      return Upload;
	}
    blueprint.register_Upload(CreateUpload,viewmodel,template);
	return CreateUpload;
});
