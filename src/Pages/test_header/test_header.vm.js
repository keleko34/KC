define([],function(){

  function test_header_vm(params,element){
    this.Node_Type = 'test_header';
    this.Node = element;
    this.mainclass = ko.observable('test_header').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return test_header_vm;
})
