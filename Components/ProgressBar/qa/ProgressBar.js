/*********************************
                this.Node = element;
                .viewmodel(this)
                .call();
              }
              if(typeof define === 'function' && define.amd){
                define('CreateProgressBar',[],function(){return CreateProgressBar});
                define([],function(){return CreateProgressBar;});
              }
              else if(typeof module === "object" && module.exports){
                module.exports = CreateProgressBar;
              }
              viewmodel.prototype.constructor = CreateProgressBar;
              if(ko && !ko.components.isRegistered(('ProgressBar').toLowerCase())){
                ko.components.register(('ProgressBar').toLowerCase(),{viewModel:viewmodel,template:template});
              }
            }
            }
      /* Add Private _variables here */
         * whenever you update something in code always call the constructor for updating the viewmodel */
        +(_disabled ? ' ProgressBar--disabled' : '')
      }
      ProgressBar.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return ProgressBar;
      }
        return ProgressBar;