define([],function(){

  function test_button_vm(params,element){
    this.Node_Type = 'test_button';
    this.Node = element;
    this.mainclass = ko.observable('test_button').extend({attach:element.localName});
    this.innerhtml_binding = ko.observable('');
    this.onclick_binding = function(){};

    /* Place Properties Here */

    /* important! this is what ties this viewmodel to the main class,
     * whenever a new vm is made it calls its constructor which is the
     * main class constructor */
    this.methods = this.constructor()
    .viewmodel(this)
    .call();

    this.Node.KViewModel = this;
    Object.keys(this).forEach((function(k,i){
      ko.attachProp(k,(ko.isObservable(this[k]) ? this[k]() : this[k]),this.Node,(!ko.isObservable(this[k])));
    }).bind(this));
  }

  test_button_vm.prototype.attachProp = function(k, val, el, isObservable){ko.attachProp(k,val,el,!isObservable);return this.methods;};

  /* Place Prototypes here */

  return test_button_vm;
})
