/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/

define(['knockout', 'text!./$Name.html','./$Name.vm','css!./$Name.css'],function(ko,template,viewmodel){
	function Create$Name(){

      /* BUILD SECTION */
      /* END BUILD SECTION */

      /* Add Private _variables here */

      function $Name(node){
        if(node){
          node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' && node.parentElement !== undefined ? node : null));
          if(!node)
          {
              console.error('you have passed an invalid node into Input: ',node);
              console.error('stack: ',new Error().stack);
              return;
          }
          var fragment = document.createDocumentFragment();
          fragment.appendChild(document.createElement('$Name'));
          node.appendChild(fragment);
        }

        /* Update viewmodel properties here */

        this.ko.applyBindings(viewmodel);
      }

      /* add methods for updating and type checking viewmodel properties */

      if(!this.ko.components.isRegistered('$Name'))
      {
        this.ko.components.register('$Name',{viewModel:viewmodel,template:template});
      }

      return $Name;
	}

    if (typeof define === "function" && define.amd)
    {
        define('Create$Name',['knockout'],function(ko){return Create$Name.bind({ko:ko});});
        define(['knockout'],function(ko){return Create$Name.bind({ko:ko});})
    }
    else if (typeof module === "object" && module.exports)
    {
        module.exports = Create$Name;
    }
	return Create$Name;
});
