/********************************* *  test_button *  Created by Keleko34 *  allows user interaction through a click ********************************//* This is Your class file, it controls the states as well as the fetching of data etc. */var Createtest_button = (function(){    /* Do not remove!!! */    /* BUILD SECTION */            var includeCSS = (function(){                var _styleNode = document.getElementById('Components-Styles');                if(!_styleNode){                    _styleNode = document.createElement('style');                    _styleNode.setAttribute('id','Components-Styles');                    _styleNode.setAttribute('media','screen');                    _styleNode.setAttribute('type','text/css');                    document.head.appendChild(_styleNode);                    _styleNode = document.getElementById('Components-Styles');                }                if(_styleNode.textContent.indexOf('test_button') < 0){                    _styleNode.textContent += '\r\n@import "/src/Components/test_button/test_button.css";';                }                return _styleNode;            }());            var template = "<div class=\"test_button\" data-bind=\"attr:{class:mainclass}\"> <!-- main button container -->  <div class=\"test_button__listener\" data-bind=\"event:{click:onclick_binding}\"> <!-- event listener -->    <div class=\"test_button__listener__content\">{{{innerhtml_binding}}}</div> <!-- content -->  </div></div>";            var viewmodel = (function(){              function test_button_vm(params,element){                this.Node_Type = 'test_button';                this.Node = element;                this.mainclass = ko.observable('test_button').extend({attach:element.localName});                this.innerhtml_binding = ko.observable('');                this.onclick_binding = function(){};                /* Place Properties Here */                /* important! this is what ties this viewmodel to the main class,                 * whenever a new vm is made it calls its constructor which is the                 * main class constructor */                this.methods = this.constructor()                .viewmodel(this)                .call();                this.Node.KViewModel = this;                Object.keys(this).forEach((function(k,i){                  ko.attachProp(k,(ko.isObservable(this[k]) ? this[k]() : this[k]),this.Node,(!ko.isObservable(this[k])));                }).bind(this));              }              test_button_vm.prototype.attachProp = function(k, val, el, isObservable){ko.attachProp(k,val,el,!isObservable);return this.methods;};              /* Place Prototypes here */              return test_button_vm;            }());            /* BluePrint Include */            var blueprint = {            register_test_button:function register_test_button(Createtest_button,viewmodel,template){              if(typeof define === 'function' && define.amd){                define('Createtest_button',[],function(){return Createtest_button});              }              else if(typeof module === "object" && module.exports){                module.exports = Createtest_button;              }              viewmodel.prototype.constructor = Createtest_button;              if(ko && !ko.components.isRegistered(('test_button').toLowerCase())){                ko.components.register(('test_button').toLowerCase(),{viewModel:viewmodel,template:template});              }            }            }            /* End Blueprint Include */    /* END BUILD SECTION */    function Createtest_button(){      var vm = {},          modularizer = CreateModularizer();      /* Add Private _variables here */      var _typeEnum = ['click','toggle','text'];      function test_button(){        modularizer(test_button);        vm.mainclass((test_button.disabled() ? ' test_button--disabled' : '')        + (' test_button--'+(test_button.type()))        + (test_button.type() === 'toggle' ? (test_button.toggled() ? ' test_button--toggled' : '') : ''));        return test_button;      }      test_button.viewmodel = function(v){        if(v === undefined){          return vm;        }        vm = (v instanceof viewmodel ? v : vm);        return test_button;      }      modularizer.add({        type:'function',        name:'onclick',        value:function(){},        preprocess:function(v){          return function(e){            if(!test_button.disabled()){              v.call(this,e);            }            if(test_button.link().length > 0){              location.href = '#'+test_button.link();            }          }        }      })      .add({        type:'boolean',        name:'disabled',        value:false      })      .add({        type:'boolean',        name:'toggled',        value:false      })      .add({        name:'link',        preprocess:function(v){          return v.replace(/(#)/g,'');        }      })      .add({        name:'innerhtml'      })      .add({        type:'enum',        name:'type',        value:'click',        checkAgainst:_typeEnum      })      /* add methods for updating and type checking viewmodel properties */      return test_button;	}    blueprint.register_test_button(Createtest_button,viewmodel,template);	return Createtest_button;}());
