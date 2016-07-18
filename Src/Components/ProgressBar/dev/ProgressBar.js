/********************************* *  ProgressBar *  Created by Keleko34 *  Shows the progress of a given event ********************************/var CreateProgressBar = (function(){    /* Do not remove!!! */
    /* BUILD SECTION */
            var includeCSS = (function(){                var _styleNode = document.getElementById('Components-Styles');                if(!_styleNode){                    _styleNode = document.createElement('style');                    _styleNode.setAttribute('id','Components-Styles');                    _styleNode.setAttribute('media','screen');                    _styleNode.setAttribute('type','text/css');                    document.head.appendChild(_styleNode);                    _styleNode = document.getElementById('Components-Styles');                }                if(_styleNode.textContent.indexOf('ProgressBar') < 0){                    _styleNode.textContent += '\r\n@import "/src/Components/ProgressBar/ProgressBar.css";';
    }                return _styleNode;            }());            var template = "<!-- ProgressBar html -->This is a progressBar!<div data-bind=\"attr:{'class':mainclass}\">  <div></div>  <div></div></div>";            var viewmodel = (function(){              function ProgressBar_vm(params,element){                this.Node_Type = 'ProgressBar';                this.Node = element;                this.mainclass = ko.observable('ProgressBar');                /* Place Properties Here */                /* important! this is what ties this viewmodel to the main class,                 * whenever a new vm is made it calls its constructor which is the                 * main class constructor */                this.methods = this.constructor()                .viewmodel(this)                .call();              }              /* Place Prototypes here */              return ProgressBar_vm;            }());            /* BluePrint Include */            var blueprint = {            register_ProgressBar:function register_ProgressBar(CreateProgressBar,viewmodel,template){              if(typeof define === 'function' && define.amd){                define('CreateProgressBar',[],function(){return CreateProgressBar});              }              else if(typeof module === "object" && module.exports){                module.exports = CreateProgressBar;              }              viewmodel.prototype.constructor = CreateProgressBar;              if(ko && !ko.components.isRegistered(('ProgressBar').toLowerCase())){                ko.components.register(('ProgressBar').toLowerCase(),{viewModel:viewmodel,template:template});              }            }            }            /* End Blueprint Include */    /* END BUILD SECTION */
    function CreateProgressBar(){
      var vm = {};      /* Add Private _variables here */      var _disabled = false,          _status = '';      function ProgressBar(){        /* 'vm' refers to the viewmodel         * whenever you update something in code always call the constructor for updating the viewmodel */        /* Update viewmodel properties here */        vm.mainclass('ProgressBar'        +(_disabled ? ' ProgressBar--disabled' : '')        + (_status.length > 0 ? ' ProgressBar--'+_status : ''));        return ProgressBar;      }      ProgressBar.viewmodel = function(v){        if(v === undefined){          return vm;        }        vm = (v instanceof viewmodel ? v : vm);        return ProgressBar;      }      ProgressBar.disabled = function(v){        if(v === undefined){          return _disabled;        }        _disabled = !!v;        return ProgressBar;      }      ProgressBar.status = function(v){        if(v === undefined){          return _status;        }        _status = (typeof v === 'string' ? v : _status);        return ProgressBar;      }      /* add methods for updating and type checking viewmodel properties */      return ProgressBar;	}    blueprint.register_ProgressBar(CreateProgressBar,viewmodel,template);	return CreateProgressBar;}());
