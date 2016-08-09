define([],function(){

  function CMS_ComponentsList_vm(params,element){
    this.Node_Type = 'CMS_ComponentsList';
    this.Node = element;
    this.mainclass = ko.observable('CMS_ComponentsList').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();
  }

  /* Place Prototypes here */

  return CMS_ComponentsList_vm;
})
