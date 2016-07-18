define([],function(){

  function $Name_vm(params,element){
    this.Node_Type = '$Name';
    this.Node = element;
    this.mainclass = ko.observable('$Name');

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();

    Object.keys(this).forEach((function(k,i){
      ko.attachProp(k,this);
    }).bind(this));
  }

  $Name_vm.prototype.attachProp = function(k,el){ko.attachProp(k,this,el);return this.methods;};

  /* Place Prototypes here */

  return $Name_vm;
})
