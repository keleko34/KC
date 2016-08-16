define([],function(){

  function test_content_vm(params,element){
    this.Node_Type = 'test_content';
    this.Node = element;
    this.mainclass = ko.observable('test_content').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return test_content_vm;
})
