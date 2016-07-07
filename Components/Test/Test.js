/*********************************
 *  Test
 *  Created by Me
 *  To test routes
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./Test.bp', './Test.vm', 'text!./Test.html', 'css!./Test.css'],function(blueprint, viewmodel, template){
	function CreateTest(){

      /* Do not remove!!! */
      /* BUILD SECTION */
      /* END BUILD SECTION */

      var vm = {};
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function Test(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('Test' + (_example ? ' Test--'+_example : ''));
        */

      }

      Test.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return Test;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   Test.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return Test;
         *   }
        */

      return Test;
	}
    blueprint.register_Test(CreateTest,viewmodel,template);
	return CreateTest;
});
