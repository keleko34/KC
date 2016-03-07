/* BUILD SECTION */



/* END BUILD SECTION */

var CreateRadio = (function(){
	function CreateRadio(){
		function Radio(node){
			node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
			if(!node)
			{
				console.error('you have passed an invalid node into Radio: ',node);
				return;
			}}
		return Radio;
	}
	return CreateRadio;
}())
