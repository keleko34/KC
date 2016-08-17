/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./$Name.bp', './$Name.vm', 'text!./$Name.html', 'text!./$Name.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function Create$Name(){
      /* modulizes this module to keep in sync with viewmodel when constructor is called */
      kc.CreateModularizer($Name);

      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function $Name(){
        /* '$Name.viewmodel' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('$Name' + (_example ? ' $Name--'+_example : ''));
        */
        return $Name;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: simplified type checked functional property
         *
         *   $Name.add({
                name:<name of property>,
                type:<>
              })
        */

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
    blueprint.register_$Name(Create$Name,viewmodel,template,css);
	return Create$Name;
});
