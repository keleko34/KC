/*********************************
 *  ProgressBar
 *  Created by Keleko34
 *  Shows the progress of a given event
 ********************************/

define(['text!./ProgressBar.html','./ProgressBar.vm','css!./ProgressBar.css'],function(template,viewmodel){
	function CreateProgressBar(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

      /* Add Private _variables here */

      function ProgressBar(node){
        if(node){
          node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' && node.parentElement !== undefined ? node : null));
          if(!node)
          {
              console.error('you have passed an invalid node into Input: ',node);
              console.error('stack: ',new Error().stack);
              return;
          }
          var fragment = document.createDocumentFragment();
          fragment.appendChild(document.createElement('ProgressBar'));
          node.appendChild(fragment);
        }

        /* Update viewmodel properties here */

        this.ko.applyBindings(viewmodel);
      }

      /* add methods for updating and type checking viewmodel properties */

      if(!this.ko.components.isRegistered('ProgressBar'))
      {
        this.ko.components.register('ProgressBar',{viewModel:viewmodel,template:template});
      }

      return ProgressBar;
	}

    if (typeof define === "function" && define.amd)
    {
        define('CreateProgressBar',['knockout'],function(ko){return CreateProgressBar.bind({ko:ko});});
        define(['knockout'],function(ko){return CreateProgressBar.bind({ko:ko});})
    }
    else if (typeof module === "object" && module.exports)
    {
        module.exports = CreateProgressBar;
    }
	return CreateProgressBar;
});
