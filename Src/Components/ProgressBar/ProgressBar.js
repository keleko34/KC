/*********************************
 *  ProgressBar
 *  Created by Keleko34
 *  Shows the progress of a given event
 ********************************/

define(['./ProgressBar.bp', './ProgressBar.vm', 'text!./ProgressBar.html', 'css!./ProgressBar.css'],function(blueprint, viewmodel, template){
	function CreateProgressBar(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

      var vm = {};
      /* Add Private _variables here */
      var _disabled = false,
          _status = '';

      function ProgressBar(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */
        vm.mainclass('ProgressBar'
        +(_disabled ? ' ProgressBar--disabled' : '')
        + (_status.length > 0 ? ' ProgressBar--'+_status : ''));

        return ProgressBar;
      }

      ProgressBar.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return ProgressBar;
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
        _status = (typeof v === 'string' ? v : _status);
        return ProgressBar;
      }

      /* add methods for updating and type checking viewmodel properties */

      return ProgressBar;
	}
    blueprint.register_ProgressBar(CreateProgressBar,viewmodel,template);
	return CreateProgressBar;
});
