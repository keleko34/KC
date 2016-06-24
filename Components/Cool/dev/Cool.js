var CreateCool = (function(){	function CreateCool(){        if(ko !== undefined)
        {
            /* BUILD SECTION */
            var includeCSS = (function(){
    var _styleTemplate = '<style id="ComponentStyles" media="screen" type="text/css"></style>',
        _styleNode = document.getElementById('ComponentStyles');
    if(!_styleNode){
        var frag = document.createDocumentFragment();
        frag.innerHTML = _styleTemplate;
        document.head.appendChild(frag);
        _styleNode = document.getElementById('ComponentStyles');
    }
    if(_styleNode.textContent.indexOf('Cool') < 0){
        _styleNode.textContent += '\r\n@import "Components/Cool/Cool.css";';
    }
    return _styleNode;
}());
            var template = "";            var viewmodel = (function(){              function Cool_vm(){                this.Node_Type = 'Cool';                /* Place Properties Here */              }              /* Place Prototypes here */              if (typeof define === "function" && define.amd)              {                define('CreateCool',Cool_vm);              }              else if (typeof module === "object" && module.exports)              {                module.exports = Cool_vm;              }              return Cool_vm;            }());            /* END BUILD SECTION */
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
            {              ko.components.register('Cool',{viewModel:viewmodel,template:template});
            }
            return Cool;
        }
        else
        {
          console.error('\033[31mThe ko variable for knockout does not exist, make sure its loaded before calling this component:\033[37m ');
          console.error('stack: ',new Error().stack);
        }
        return null;
	}    if (typeof define === "function" && define.amd)    {        define('CreateCool',CreateCool);
    }    else if (typeof module === "object" && module.exports)    {        module.exports = CreateCool;
    }	return CreateCool;}());
