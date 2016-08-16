/*********************************
 *  _test
 *  Created by keleko34
 *  Test page for components and sections
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./_test.bp', './_test.vm', 'text!./_test.html', 'text!./_test.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Create_test(){

      var vm = {},
          modularizer = kc.CreateModularizer();
      /* Add Private _variables here */

      function _test(){
        modularizer(_test);

        /* Update viewmodel properties here */
        vm.Node.querySelector('._test__btnfirst').onclick = function(e){
          console.log('first!');
        }
        vm.Node.querySelector('._test__btnsecond').onclick = function(e){
          console.log('second!');
        }

        return _test;
      }

      _test.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return _test;
      }

      _test.modularizer = function(){
        return modularizer;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   _test.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return _test;
         *   }
        */

      return _test;
	}
    blueprint.register__test(Create_test,viewmodel,template,css);
	return Create_test;
});
