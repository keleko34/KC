/********************************* *  Upload *  Created by Keleko34 *  This section is for uploading files ********************************//* This is Your class file, it controls the states as well as the fetching of data etc. */var CreateUpload = (function(){    /* Do not remove!!! */    /* BUILD SECTION */            var includeCSS = (function(){                var _styleNode = document.getElementById('Sections-Styles');                if(!_styleNode){                    _styleNode = document.createElement('style');                    _styleNode.setAttribute('id','Sections-Styles');                    _styleNode.setAttribute('media','screen');                    _styleNode.setAttribute('type','text/css');                    document.head.appendChild(_styleNode);                    _styleNode = document.getElementById('Sections-Styles');                }                if(_styleNode.textContent.indexOf('Upload') < 0){                    _styleNode.textContent += '\r\n@import "/src/Sections/Upload/Upload.css";';
    }                return _styleNode;            }());            var template = "<!-- Upload html --><progressbar></progressbar><photopost></photopost>";            var viewmodel = (function(){              function Upload_vm(params,element){                this.Node_Type = 'Upload';                this.Node = element;                this.mainclass = ko.observable('Upload');                /* Place Properties Here */                /* important! this is what ties this viewmodel to the main class,                 * whenever a new vm is made it calls its constructor which is the                 * main class constructor */                this.methods = this.constructor()                .viewmodel(this)                .call();              }              /* Place Prototypes here */              return Upload_vm;            }());            /* BluePrint Include */            var blueprint = {            register_Upload:function register_Upload(CreateUpload,viewmodel,template){              if(typeof define === 'function' && define.amd){                define('CreateUpload',[],function(){return CreateUpload});              }              else if(typeof module === "object" && module.exports){                module.exports = CreateUpload;              }              viewmodel.prototype.constructor = CreateUpload;              if(ko && !ko.components.isRegistered(('Upload').toLowerCase())){                ko.components.register(('Upload').toLowerCase(),{viewModel:viewmodel,template:template});              }            }            }            /* End Blueprint Include */    /* END BUILD SECTION */	function CreateUpload(){      var vm = {};      /* Add Private _variables here */      /* ex: private for functional property         *         *   var _example = '';        */      function Upload(){        /* 'vm' refers to the viewmodel         * whenever you update something in code always call the constructor for updating the viewmodel */        /* Update viewmodel properties here */        /* ex: updates the class attr with a changed state         *         *   vm.mainclass('Upload' + (_example ? ' Upload--'+_example : ''));        */        return Upload;      }      Upload.viewmodel = function(v){        if(v === undefined){          return vm;        }        vm = (v instanceof viewmodel ? v : vm);        return Upload;      }      /* add methods for updating and type checking viewmodel properties */      /* ex: functional property, returns value if nothing, sets if value is string         *         *   Upload.example = function(v){         *     if(v === undefined){         *        return _example;         *     }         *     _example = (typeof v === 'string' ? v : _example);         *     return Upload;         *   }        */      return Upload;	}    blueprint.register_Upload(CreateUpload,viewmodel,template);	return CreateUpload;}());
