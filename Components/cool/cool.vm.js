define(['knockout'],function(ko){
  function cool_vm(){
    this.Node_Type = 'cool';

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  if (typeof define === "function" && define.amd)
  {
    define('Createcool',cool_vm);
  }
  else if (typeof module === "object" && module.exports)
  {
    module.exports = cool_vm;
  }
  return cool_vm;
})
