define([],function(){

  function Edit_Login_vm(params,element){
    this.Node_Type = 'Edit_Login';
    this.Node = element;
    this.mainclass = ko.observable('Edit_Login').extend({attach:element.getAttribute('class')});

    this.warning_binding = ko.observable(false).extend({translateBool:['none','block']});

    this.rememberText = ko.observable(false).extend({translateBool:['Remembered','Remember Me']});
    this.rememberColor = ko.observable(false).extend({translateBool:['#67a350','#A9A9A9']});
    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return Edit_Login_vm;
})
