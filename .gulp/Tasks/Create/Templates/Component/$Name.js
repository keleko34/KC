/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/

define(['knockout', 'text!./$Name.html','./$Name.vm','css!./$Name.css'],function(ko,template,viewmodel){
	function Create$Name(){

        if(ko !== undefined)
        {
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

              ko.applyBindings();
            }

            /* add methods for updating and type checking viewmodel properties */

            if(!ko.components.isRegistered('$Name'))
            {
              ko.components.register('$Name',{viewModel:viewmodel,template:template});
            }

            return $Name;
        }
        else
        {
          console.error('\033[31mThe ko variable for knockout does not exist, make sure its loaded before calling this component:\033[37m Componnt');
          console.error('stack: ',new Error().stack);
        }
        return null;
	}

    if (typeof define === "function" && define.amd)
    {
        define('Create$Name',function(){return Create$Name;});
        define([],function(){return Create$Name;})
    }
    else if (typeof module === "object" && module.exports)
    {
        module.exports = Create$Name;
    }
	return Create$Name;
});
