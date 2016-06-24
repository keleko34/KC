define(['knockout', 'text!./Cool.html','./Cool.vm','css!./Cool.css'],function(ko,template,viewmodel){
	function CreateCool(){

        if(ko !== undefined)
        {
            /* BUILD SECTION */
            /* END BUILD SECTION */

            /* Add Private _variables here */

            function Cool(node){
              if(node){
                node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' && node.parentElement !== undefined ? node : null));
                if(!node)
                {
                    console.error('you have passed an invalid node into Input: ',node);
                    console.error('stack: ',new Error().stack);
                    return;
                }
                var fragment = document.createDocumentFragment();
                fragment.appendChild(document.createElement('Cool'));
                node.appendChild(fragment);
              }

              /* Update viewmodel properties here */

              ko.applyBindings();
            }

            /* add methods for updating and type checking viewmodel properties */

            if(!ko.components.isRegistered('Cool'))
            {
              ko.components.register('Cool',{viewModel:viewmodel,template:template});
            }

            return Cool;
        }
        else
        {
          console.error('\033[31mThe ko variable for knockout does not exist, make sure its loaded before calling this component:\033[37m ');
          console.error('stack: ',new Error().stack);
        }
        return null;
	}

    if (typeof define === "function" && define.amd)
    {
        define('CreateCool',CreateCool);
    }
    else if (typeof module === "object" && module.exports)
    {
        module.exports = CreateCool;
    }
	return CreateCool;
});
