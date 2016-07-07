/*********************************
 *  ProgressBar
 *  Created by Keleko34
 *  Shows the progress of a given event
 ********************************/

define(['./ProgressBar.bp', './ProgressBar.vm', 'text!./ProgressBar.html', 'css!./ProgressBar.css'],function(blueprint, viewmodel, template){
	function CreateProgressBar(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

      /* Add Private _variables here */

      function ProgressBar(){
        /* 'this' in the constructor refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */
      }

      /* add methods for updating and type checking viewmodel properties */

      return ProgressBar;
	}
    blueprint.register_ProgressBar(CreateProgressBar,viewmodel,template);
	return CreateProgressBar;
});
