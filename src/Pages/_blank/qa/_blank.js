/*********************************
 *  _blank
 *  Created by Keleko34
 *  blank templated page
 ********************************/
/* This is Your class file, it controls the states as well as the fetching of data etc. */
var Create_blank = (function(){
    /* Do not remove!!! */
    /* BUILD SECTION */
            var includeCSS = (function(){
    }
                this.Node_Type = '_blank';
                this.Node = element;
                this.mainclass = ko.observable('_blank');
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
              _blank_vm.prototype.attachProp = function(k,el){ko.attachProp(k,this,el);return this.methods;};
              /* Place Prototypes here */
              return _blank_vm;
            }());
              if(typeof define === 'function' && define.amd){
                define('Create_blank',[],function(){return Create_blank});
              }
              else if(typeof module === "object" && module.exports){
                module.exports = Create_blank;
              }
              viewmodel.prototype.constructor = Create_blank;
              if(ko && !ko.components.isRegistered(('_blank').toLowerCase())){
                ko.components.register(('_blank').toLowerCase(),{viewModel:viewmodel,template:template});
              }
            }
            }
	function Create_blank(){
      var vm = {};
      /* Add Private _variables here */
      /* ex: private for functional property
         *
         *   var _example = '';
        */
      function _blank(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */
        /* Update viewmodel properties here */
        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('_blank' + (_example ? ' _blank--'+_example : ''));
        */
        return _blank;
      }
      _blank.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return _blank;
      }
      /* add methods for updating and type checking viewmodel properties */
      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   _blank.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return _blank;
         *   }
        */
      return _blank;
	}
    blueprint.register__blank(Create_blank,viewmodel,template);
	return Create_blank;
}());