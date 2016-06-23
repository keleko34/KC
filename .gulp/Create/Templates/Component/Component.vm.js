define(['knockout'],function(ko){
  function Component_vm(){
    this.Node_Type = 'Component';

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  if (typeof define === "function" && define.amd)
  {
    define('CreateComponent',Component_vm);
  }
  else if (typeof module === "object" && module.exports)
  {
    module.exports = Component_vm;
  }
  return Component_vm;
})
