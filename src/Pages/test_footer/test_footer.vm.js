define([],function(){

  function test_footer_vm(params,element){
    this.Node_Type = 'test_footer';
    this.Node = element;
    this.mainclass = ko.observable('test_footer').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return test_footer_vm;
})
