define([],function(){
  function PhotoPost_vm(params,element){
    this.Node_Type = 'PhotoPost';
    this.Node = element;
    this.mainclass = ko.observable('PhotoPost');

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();
  }

  /* Place Prototypes here */

  return PhotoPost_vm;
})