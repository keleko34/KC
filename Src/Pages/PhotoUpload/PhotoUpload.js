/*********************************
 *  PhotoUpload
 *  Created by Keleko34
 *  Page for uploading photos
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./PhotoUpload.bp', './PhotoUpload.vm', 'text!./PhotoUpload.html', 'css!./PhotoUpload.css' ],function(blueprint, viewmodel, template){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function CreatePhotoUpload(){

      var vm = {};
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function PhotoUpload(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('PhotoUpload' + (_example ? ' PhotoUpload--'+_example : ''));
        */

      }

      PhotoUpload.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return PhotoUpload;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   PhotoUpload.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return PhotoUpload;
         *   }
        */

      return PhotoUpload;
	}
    blueprint.register_PhotoUpload(CreatePhotoUpload,viewmodel,template);
	return CreatePhotoUpload;
});
