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
      var _disabled = false,
          _status = '';

      function ProgressBar(){
        /* 'this' in the constructor refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */
        this.mainclass('ProgressBar'
        +(_disabled ? ' ProgressBar--disabled' : '')
        + (_status.length > 0 ? ' ProgressBar--'+_status : ''));
      }

      ProgressBar.disabled = function(v){
        if(v === undefined){
          return _disabled;
        }
        _disabled = !!v;
        return ProgressBar;
      }

      ProgressBar.status = function(v){
        if(v === undefined){
          return _status;
        }
        _status = (typeof v === 'sting' ? v : _status);
        return ProgressBar;
      }

      /* add methods for updating and type checking viewmodel properties */

      return ProgressBar;
	}
    blueprint.register_ProgressBar(CreateProgressBar,viewmodel,template);
	return CreateProgressBar;
});
