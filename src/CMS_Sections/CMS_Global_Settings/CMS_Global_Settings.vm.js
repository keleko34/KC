define([],function(){

  function CMS_Global_Settings_vm(params,element){
    this.Node_Type = 'CMS_Global_Settings';
    this.Node = element;
    this.mainclass = ko.observable('CMS_Global_Settings').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return CMS_Global_Settings_vm;
})
