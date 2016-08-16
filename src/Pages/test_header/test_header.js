/*********************************
 *  test_header
 *  Created by Keleko34
 *  a test grid header
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_header.bp', './test_header.vm', 'text!./test_header.html', 'text!./test_header.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_header(){

      var vm = {},
          modularizer = kc.CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function test_header(){
        modularizer(test_header);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('test_header' + (_example ? ' test_header--'+_example : ''));
        */
        return test_header;
      }

      test_header.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return test_header;
      }

      test_header.modularizer = function(){
        return modularizer;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   test_header.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return test_header;
         *   }
        */

      return test_header;
	}
    blueprint.register_test_header(Createtest_header,viewmodel,template,css);
	return Createtest_header;
});
