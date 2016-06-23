var Createcool = (function(){
	function Createcool(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

        /* Add Private _variables here */

		function cool(node){
          if(node){
            node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' && node.parentElement !== undefined ? node : null));
            if(!node)
            {
                console.error('you have passed an invalid node into Input: ',node);
                console.error('stack: ',new Error().stack);
                return;
            }
            var fragment = document.createDocumentFragment();
            fragment.appendChild(document.createElement('cool'));
            node.appendChild(fragment);
          }

          /* Update viewmodel properties here */

          ko.applyBindings();
		}

        /* add methods for updating and type checking viewmodel properties */


		return cool;
	}

    if(ko && !ko.components.isRegistered('cool')){
      ko.components.register('cool',{viewModel:viewmodel,template:template});
    }
    if (typeof define === "function" && define.amd)
    {
      define('Createcool',Createcool);
    }
    else if (typeof module === "object" && module.exports)
    {
      module.exports = Createcool;
    }
	return Createcool;
}());
