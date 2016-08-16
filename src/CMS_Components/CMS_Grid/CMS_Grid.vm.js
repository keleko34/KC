define([],function(){

  function CMS_Grid_vm(params,element){
    this.Node_Type = 'CMS_Grid';
    this.Node = element;
    this.mainclass = ko.observable('CMS_Grid').extend({attach:element.getAttribute('class')});

    this.width_binding = ko.observable('').extend({px:true});
    this.height_binding = ko.observable('').extend({px:true});
    this.minHeight_binding = ko.observable('').extend({px:true});
    this.minWidth_binding = ko.observable('').extend({px:true});
    /* Place Properties Here */

  }

  /* Place Prototypes here */

  return CMS_Grid_vm;
})
