/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/

define(['./$Name.bp', './$Name.vm', 'text!./$Name.html', 'css!./$Name.css'],function(blueprint, viewmodel, template){
	function Create$Name(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

      /* Add Private _variables here */

      function $Name(){
        /* 'this' in the constructor refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */
      }

      /* add methods for updating and type checking viewmodel properties */

      return $Name;
	}
    blueprint.register_$Name(Create$Name,viewmodel,template);
	return Create$Name;
});
