define([],function(){

  function CMS_ComponentsList_vm(params,element){
    this.Node_Type = 'CMS_ComponentsList';
    this.Node = element;
    this.mainclass = ko.observable('CMS_ComponentsList').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return CMS_ComponentsList_vm;
})
