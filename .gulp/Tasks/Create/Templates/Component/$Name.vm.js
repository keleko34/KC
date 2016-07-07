define([],function(){
  function $Name_vm(){
    this.Node_Type = '$Name';
    this.mainclass = ko.observable('$Name');

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor();

    this.methods.call();
  }

  /* Place Prototypes here */

  return $Name_vm;
})
