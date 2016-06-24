define(['knockout'],function(ko){
  function Cool_vm(){
    this.Node_Type = 'Cool';

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  if (typeof define === "function" && define.amd)
  {
    define('CreateCool',Cool_vm);
  }
  else if (typeof module === "object" && module.exports)
  {
    module.exports = Cool_vm;
  }
  return Cool_vm;
})
