define([],function(){
  function ProgressBar_vm(params,element){
    this.Node_Type = 'ProgressBar';
    this.params = params;
    this.Node = element;
    this.mainclass = ko.observable('ProgressBar');

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor();

    this.methods();
  }

  /* Place Prototypes here */

  return ProgressBar_vm;
})
