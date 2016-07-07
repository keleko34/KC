define([],function(){

  function ProgressBar_vm(){
    var _disabled = false,
        _status = '';

    /* Place Properties Here */
    this.Node_Type = 'ProgressBar';

    this.classMain = ko.pureComputed(function(){
      this.disabled(); //what the heck ko??? what is the subscriber crap?
      this.status();
        return this.Node_Type + ' '
        + (_disabled ? 'ProgressBar--disabled ' : '')
        + (_status.length > 0 ? 'ProgressBar--'+_status : '');
    },this);

    this.disabled = ko.pureComputed({
      read:function(){
        return _disabled;
      },
      write:function(v){
        _disabled = !!v;
        this.disabled.notifySubscribers();
      },
      owner:this
    });

    this.status = ko.pureComputed({
      read:function(){
        return _status;
      },
      write:function(v){
        _status = (typeof v === 'string' ? v : _status);
        this.status.notifySubscribers();
      },
      owner:this
    });
  }

  /* Place Prototypes here */

  return ProgressBar_vm;
})
