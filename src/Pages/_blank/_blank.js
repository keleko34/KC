/*********************************
 *  _blank
 *  Created by Keleko34
 *  blank templated page
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./_blank.bp', './_blank.vm', 'text!./_blank.html', 'text!./_blank.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Create_blank(){

      var vm = {};
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function _blank(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('_blank' + (_example ? ' _blank--'+_example : ''));
        */
        return _blank;
      }

      _blank.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return _blank;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   _blank.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return _blank;
         *   }
        */

      return _blank;
	}
    blueprint.register__blank(Create_blank,viewmodel,template,css);
	return Create_blank;
});
