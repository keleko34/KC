/*********************************
                this.Node_Type = 'Test';
                this.mainclass = ko.observable('Test');
                .viewmodel(this)
                .call();
              }
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
            }
      /* Add Private _variables here */
         * whenever you update something in code always call the constructor for updating the viewmodel */
        */
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return Test;
      }
      /* add methods for updating and type checking viewmodel properties */