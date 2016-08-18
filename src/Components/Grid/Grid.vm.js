define([],function(){

  function Grid_vm(params,element){
    this.Node_Type = 'Grid';
    this.Node = element;
    this.mainclass = ko.observable('Grid').extend({attach:element.getAttribute('class')});

    this.width_binding = ko.observable('').extend({px:true});
    this.height_binding = ko.observable('').extend({px:true});
    this.minHeight_binding = ko.observable('').extend({px:true});
    this.minWidth_binding = ko.observable('').extend({px:true});
    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return Grid_vm;
})
