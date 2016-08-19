define([],function(){

  function Edit_Login_vm(params,element){
    this.Node_Type = 'Edit_Login';
    this.Node = element;
    this.mainclass = ko.observable('Edit_Login').extend({attach:element.getAttribute('class')});

    this.warning = ko.observable(false).extend({translateBool:['block','none']});
    this.warningtype = ko.observable('error')

    this.rememberText = ko.observable(false).extend({translateBool:['Your Remembered!','Remember Me']});
    this.rememberColor = ko.observable(false).extend({translateBool:['#67a350','#A9A9A9']});
    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return Edit_Login_vm;
})
