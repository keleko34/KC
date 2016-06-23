define(['knockout', 'text!./Component.html','./Component.vm','css!./Component.css'],function(ko,template,viewmodel){
	function CreateComponent(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

        /* Add Private _variables here */

		function Component(node){
          if(node){
            node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' && node.parentElement !== undefined ? node : null));
            if(!node)
            {
                console.error('you have passed an invalid node into Input: ',node);
                console.error('stack: ',new Error().stack);
                return;
            }
            var fragment = document.createDocumentFragment();
            fragment.appendChild(document.createElement('Component'));
            node.appendChild(fragment);
          }

          /* Update viewmodel properties here */

          ko.applyBindings();
		}

        /* add methods for updating and type checking viewmodel properties */


		return Component;
	}

    if(ko && !ko.components.isRegistered('Component')){
      ko.components.register('Component',{viewModel:viewmodel,template:template});
    }
    if (typeof define === "function" && define.amd)
    {
      define('CreateComponent',CreateComponent);
    }
    else if (typeof module === "object" && module.exports)
    {
      module.exports = CreateComponent;
    }
	return CreateComponent;
});
