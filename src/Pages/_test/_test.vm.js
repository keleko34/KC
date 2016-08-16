define([],function(){

  function _test_vm(params,element){
    this.Node_Type = '_test';
    this.Node = element;
    this.mainclass = ko.observable('_test').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return _test_vm;
})
