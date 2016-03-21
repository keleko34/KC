/* BUILD SECTION */
/* END BUILD SECTION */

define([],function(){
	function CreateInput(){
		function Input(node){
			node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
			if(!node)
			{
				console.error('you have passed an invalid node into Input: ',node);
				return;
			}
		}
		return Input;
	}
	return CreateInput;
})
