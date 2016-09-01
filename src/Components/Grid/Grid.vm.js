define([],function(){

  function grid_vm(params,element){
    this.Node_Type = 'grid';
    this.Node = element;
    this.mainclass = ko.observable('grid').extend({attach:'grid'});

    this.autowidth_binding = ko.observable('').extend({px:true});
    this.height_binding = ko.observable('').extend({px:true});
    this.min_binding = ko.observable('').extend({px:true});

    this.clearfloat_binding = ko.observable(false).extend({translateBool:['both','none']});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return grid_vm;
})
