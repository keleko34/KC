/*********************************
 *  test_footer
 *  Created by Keleko34
 *  A test grid footer
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_footer.bp', './test_footer.vm', 'text!./test_footer.html', 'text!./test_footer.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_footer(){

      var vm = {},
          modularizer = kc.CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function test_footer(){
        modularizer(test_footer);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('test_footer' + (_example ? ' test_footer--'+_example : ''));
        */
        return test_footer;
      }

      test_footer.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return test_footer;
      }

      test_footer.modularizer = function(){
        return modularizer;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   test_footer.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return test_footer;
         *   }
        */

      return test_footer;
	}
    blueprint.register_test_footer(Createtest_footer,viewmodel,template,css);
	return Createtest_footer;
});
