define([],function(){

  function test_button_vm(params,element){
    this.Node_Type = 'test_button';
    this.Node = element;
    this.mainclass = ko.observable('test_button').extend({attach:element.getAttribute('class')});
    this.innerhtmlbinding = ko.observable('');
    this.onclickbinding = function(){};

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

  test_button_vm.prototype.attachProp = function(k,el){ko.attachProp(k,this,el);return this.methods;};

  /* Place Prototypes here */

  return test_button_vm;
})
