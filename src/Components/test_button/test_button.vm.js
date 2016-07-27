define([],function(){

  function test_button_vm(params,element){
    this.Node_Type = 'test_button';
    this.Node = element;
    this.mainclass = ko.observable('test_button').extend({attach:element.localName});
    this.innerhtml_binding = ko.observable('');
    this.onclick_binding = function(){};

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();
  }

  /* Place Prototypes here */

  return test_button_vm;
})
