define([],function(){

  function Edit_Login_vm(params,element){
    this.Node_Type = 'Edit_Login';
    this.Node = element;
    this.mainclass = ko.observable('Edit_Login').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return Edit_Login_vm;
})
