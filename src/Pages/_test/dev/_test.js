/*********************************
 *  _test
 *  Created by keleko34
 *  Test page for components and sections
 ********************************/
/* This is Your class file, it controls the states as well as the fetching of data etc. */
var Create_test = (function(){
    /* Do not remove!!! */
    /* BUILD SECTION */
            var includeCSS = (function(){                var _styleNode = document.getElementById('Pages-Styles');                if(!_styleNode){                    _styleNode = document.createElement('style');                    _styleNode.setAttribute('id','Pages-Styles');                    _styleNode.setAttribute('media','screen');                    _styleNode.setAttribute('type','text/css');                    document.head.appendChild(_styleNode);                    _styleNode = document.getElementById('Pages-Styles');                }                if(_styleNode.textContent.indexOf('_test') < 0){                    _styleNode.textContent += '\r\n@import "/src/Pages/_test/_test.css";';
    }                return _styleNode;            }());            var template = "<test_button class=\"_test__btnfirst\">First button</test_button><test_button class=\"_test__btnsecond\">Second Button</test_button>";            var viewmodel = (function(){              function _test_vm(params,element){
                this.Node_Type = '_test';
                this.Node = element;
                this.mainclass = ko.observable('_test').extend({attach:element.getAttribute('class')});
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
              _test_vm.prototype.attachProp = function(k,el){ko.attachProp(k,this,el);return this.methods;};
              /* Place Prototypes here */
              return _test_vm;
            }());            /* BluePrint Include */            var blueprint = {            register__test:function register__test(Create_test,viewmodel,template){
              if(typeof define === 'function' && define.amd){
                define('Create_test',[],function(){return Create_test});
              }
              else if(typeof module === "object" && module.exports){
                module.exports = Create_test;
              }
              viewmodel.prototype.constructor = Create_test;
              if(ko && !ko.components.isRegistered(('_test').toLowerCase())){
                ko.components.register(('_test').toLowerCase(),{viewModel:viewmodel,template:template});
              }
            }
            }            /* End Blueprint Include */    /* END BUILD SECTION */
	function Create_test(){
      var vm = {},
          modularizer = CreateModularizer();
      /* Add Private _variables here */
      function _test(){
        modularizer(_test);
        /* Update viewmodel properties here */
        vm.Node.querySelector('._test__btnfirst').onclick = function(e){
          console.log('first!');
        }
        vm.Node.querySelector('._test__btnsecond').onclick = function(e){
          console.log('second!');
        }
        return _test;
      }
      _test.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return _test;
      }
      /* add methods for updating and type checking viewmodel properties */
      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   _test.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return _test;
         *   }
        */
      return _test;
	}
    blueprint.register__test(Create_test,viewmodel,template);
	return Create_test;
}());
