/*********************************
 *  test_content
 *  Created by Keleko34
 *  test grid for main content
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_content.bp', './test_content.vm', 'text!./test_content.html', 'text!./test_content.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_content(){

      var vm = {},
          modularizer = kc.CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function test_content(){
        modularizer(test_content);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('test_content' + (_example ? ' test_content--'+_example : ''));
        */
        return test_content;
      }

      test_content.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return test_content;
      }

      test_content.modularizer = function(){
        return modularizer;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   test_content.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return test_content;
         *   }
        */

      return test_content;
	}
    blueprint.register_test_content(Createtest_content,viewmodel,template,css);
	return Createtest_content;
});
