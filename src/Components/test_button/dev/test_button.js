/*********************************
    }
                this.Node_Type = 'test_button';
                this.Node = element;
                this.mainclass = ko.observable('test_button').extend({attach:element.localName});
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
            }());
              if(typeof define === 'function' && define.amd){
                define('Createtest_button',[],function(){return Createtest_button});
              }
              else if(typeof module === "object" && module.exports){
                module.exports = Createtest_button;
              }
              viewmodel.prototype.constructor = Createtest_button;
              if(ko && !ko.components.isRegistered(('test_button').toLowerCase())){
                ko.components.register(('test_button').toLowerCase(),{viewModel:viewmodel,template:template});
              }
            }
            }