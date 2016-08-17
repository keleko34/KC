define([],function(){

  function $Name_vm(params,element){
    this.Node_Type = '$Name';
    this.Node = element;
    this.mainclass = ko.observable('$Name').extend({attach:element.getAttribute('class')});

    /* Place Properties Here */
  }

  /* Place Prototypes here */

  return $Name_vm;
})
