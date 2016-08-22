define([],function(){

  function CMS_test_button_vm(params,element){
    this.Node_Type = 'CMS_test_button';
    this.Node = element;
    this.mainclass = ko.observable('CMS_test_button').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return CMS_test_button_vm;
})
