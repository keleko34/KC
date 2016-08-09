define([],function(){

  function test_header_vm(params,element){
    this.Node_Type = 'test_header';
    this.Node = element;
    this.mainclass = ko.observable('test_header').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();
  }

  /* Place Prototypes here */

  return test_header_vm;
})
