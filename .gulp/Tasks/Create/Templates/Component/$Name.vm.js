define(['knockout'],function(ko){
  function $Name_vm(){
    this.Node_Type = '$Name';

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  if (typeof define === "function" && define.amd)
  {
    define('Create$Name',$Name_vm);
  }
  else if (typeof module === "object" && module.exports)
  {
    module.exports = $Name_vm;
  }
  return $Name_vm;
})
