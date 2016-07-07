/********************************* *  Test *  Created by Me *  To test routes ********************************//* This is Your class file, it controls the states as well as the fetching of data etc. */var CreateTest = (function(){	function CreateTest(){      /* Do not remove!!! */      /* BUILD SECTION */            var template = "<!-- Test html -->";            var viewmodel = (function(){              function Test_vm(params,element){
                this.Node_Type = 'Test';                this.Node = element;
                this.mainclass = ko.observable('Test');                /* Place Properties Here */                /* important! this is what ties this viewmodel to the main class,                 * whenever a new vm is made it calls its constructor which is the                 * main class constructor */                this.methods = this.constructor()
                .viewmodel(this)
                .call();
              }              /* Place Prototypes here */              return Test_vm;            }());            /* BluePrint Include */            var blueprint = {            register_Test:function register_Test(CreateTest,viewmodel,template){
              if(typeof define === 'function' && define.amd){
                define('CreateTest',[],function(){return CreateTest});
                define([],function(){return CreateTest;});
              }
              else if(typeof module === "object" && module.exports){
                module.exports = CreateTest;
              }
              viewmodel.prototype.constructor = CreateTest;
              if(ko && !ko.components.isRegistered(('Test').toLowerCase())){
                ko.components.register(('Test').toLowerCase(),{viewModel:viewmodel,template:template});
              }
            }
            }            /* End Blueprint Include */      /* END BUILD SECTION */      var vm = {};
      /* Add Private _variables here */      /* ex: private for functional property         *         *   var _example = '';        */      function Test(){        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */        /* Update viewmodel properties here */        /* ex: updates the class attr with a changed state         *         *   vm.mainclass('Test' + (_example ? ' Test--'+_example : ''));
        */      }      Test.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return Test;
      }
      /* add methods for updating and type checking viewmodel properties */      /* ex: functional property, returns value if nothing, sets if value is string         *         *   Test.example = function(v){         *     if(v === undefined){         *        return _example;         *     }         *     _example = (typeof v === 'string' ? v : _example);         *     return Test;         *   }        */      return Test;	}    blueprint.register_Test(CreateTest,viewmodel,template);	return CreateTest;}());
