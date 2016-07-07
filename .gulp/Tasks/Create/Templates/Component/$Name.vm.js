define([],function(){
  function $Name_vm(){
    this.Node_Type = '$Name';

    this.classMain = ko.pureComputed({
      read:function(){
        return this.Node_Type; //ad custom classes here
      },
      owner:this
    });

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
