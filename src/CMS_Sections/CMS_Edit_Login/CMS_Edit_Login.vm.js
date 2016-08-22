define([],function(){

  function CMS_Edit_Login_vm(params,element){
    this.Node_Type = 'CMS_Edit_Login';
    this.Node = element;
    this.mainclass = ko.observable('CMS_Edit_Login').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return CMS_Edit_Login_vm;
})
