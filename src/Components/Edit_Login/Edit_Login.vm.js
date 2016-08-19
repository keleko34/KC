define([],function(){

  function Edit_Login_vm(params,element){
    this.Node_Type = 'Edit_Login';
    this.Node = element;
    this.mainclass = ko.observable('Edit_Login').extend({attach:element.getAttribute('class')});

    this.warning_binding = ko.observable(false).extend({translateBool:['none','block']});
    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return Edit_Login_vm;
})
