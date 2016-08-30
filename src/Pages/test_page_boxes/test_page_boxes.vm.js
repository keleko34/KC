define([],function(){

  function test_page_boxes_vm(params,element){
    this.Node_Type = 'test_page_boxes';
    this.Node = element;
    this.mainclass = ko.observable('test_page_boxes').extend({attach:'test_page_boxes'});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return test_page_boxes_vm;
})
