define([],function(){

  function edit_login_vm(params,element){
    this.Node_Type = 'edit_login';
    this.Node = element;
    this.mainclass = ko.observable('').extend({attach:element.getAttribute('class')});

    this.warning = ko.observable(false).extend({translateBool:['block','none']});

    this.rememberText = ko.observable(false).extend({translateBool:['Your Remembered!','Remember Me']});
    this.rememberColor = ko.observable(false).extend({translateBool:['#67a350','#A9A9A9']});
    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return edit_login_vm;
})
