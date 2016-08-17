define([],function(){

  function CMS_ComponentsListItem_vm(params,element){
    this.Node_Type = 'CMS_ComponentsListItem';
    this.Node = element;
    this.mainclass = ko.observable('CMS_ComponentsListItem').extend({attach:element.getAttribute('class')});

  }

  return CMS_ComponentsListItem_vm;
})
