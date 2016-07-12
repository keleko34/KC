/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./$Name.bp', './$Name.vm', 'text!./$Name.html', 'css!./$Name.css' $Components[x](, './Components/$x/$x')],function(blueprint, viewmodel, template){

	function Create$Name(){

      /* Do not remove!!! */
      /* BUILD SECTION */
      /* END BUILD SECTION */

      var vm = {};
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function $Name(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('$Name' + (_example ? ' $Name--'+_example : ''));
        */

      }

      $Name.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return $Name;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   $Name.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return $Name;
         *   }
        */

      return $Name;
	}
    blueprint.register_$Name(Create$Name,viewmodel,template);
	return Create$Name;
});
