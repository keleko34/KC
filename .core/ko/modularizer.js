kc.Modularize = function(func){
    var _func = func,
        _viewmodel = undefined,
        _node = undefined,
        props = {};

    function module(){

      /* Here we update all viewmodel attributes */
      Object.keys(props).forEach(function(k,i){

        /* we do not add or update isMethods or instances */
        if(!module[k].isMethod() && module[k].type() !== 'instance'){

          /* if property doesnt exist we add it */
          if(!_viewmodel[k+"_binding"]){
            _viewmodel[k+"_binding"] = (module[k].type() !== 'function' ? ko.observable() : module[k]());
            kc.override.bindings.addToViewModel(_viewmodel,k,module[k]());
          }
          else{
            kc.override.bindings.addToViewModel(_viewmodel,k,module[k]());
          }
          if(ko.isObservable(_viewmodel[k+"_binding"])){
            _viewmodel[k+"_binding"](module[k]());
          }
          else{
            _viewmodel[k+"_binding"] = module[k]();
          }
        }
      });

      Object.keys(_viewmodel).forEach(function(k,i){
        if(module[k] === undefined && k.indexOf('_binding') < 0){
          var val = (ko.isObservable(_viewmodel[k]) ? _viewmodel[k]() : _viewmodel[k]);
          kc.override.bindings.addToModule(module,k,val);
        }
      });

      if(_node.KC) _func.call(module);
      return module;
    }

    function add(options){
      props[(options.name !== undefined ? options.name : 'default')] = CreateProperty()
      .type((options.type !== undefined ? options.type : 'string'))
      .propName((options.name !== undefined ? options.name : 'default'))
      .preprocess((options.preprocess !== undefined ? options.preprocess : function(v){return v;}))
      .checkAgainst((options.checkAgainst !== undefined ? options.checkAgainst : (options.type === 'enum' ? [] : (options.type === 'instance' ? this : ''))))
      .isMethod((options.type === 'function' && options.isMethod !== undefined ? options.isMethod : false));
      props[(options.name !== undefined ? options.name : 'default')]((options.value !== undefined ? options.value : ''));
      module[(options.name !== undefined ? options.name : 'default')] = props[(options.name !== undefined ? options.name : 'default')];
      return module;
    }

    function CreateProperty(){

      var _type = 'string',
          _typeEnum = Object.keys(kc.isType),
          _name = '',
          _value = '',
          _preprocess = function(v){return v;},
          _isMethod = false,
          _checkAgainst = '';


      function Property(value){
        if(value === undefined){
          return _value;
        }
        value = kc.isType[_type](value,_value,_checkAgainst);
        if(value !== undefined)
        {
          _value = _preprocess(value);

          /* may no longer needed as we apply updates based on constructor call */

          /* if(typeof this.viewmodel === 'function' && this.viewmodel()[_name+"_binding"]){
            if(ko.isObservable(this.viewmodel()[_name+"_binding"])){
              if(_type !== 'array' && _type !== 'object' && this.viewmodel()[_name+"_binding"]().toString() !== _value.toString()){
                this.viewmodel()[_name+"_binding"](_value);
              }
              else if(_type === 'array' && _type === 'object'){
                this.viewmodel()[_name+"_binding"](_value);
              }
            }
            else{
              if(_type !== 'array' && _type !== 'object' && this.viewmodel()[_name+"_binding"].toString() !== _value.toString()){
                this.viewmodel()[_name+"_binding"] = _value;
              }
              else if(_type === 'array' && _type === 'object'){
                this.viewmodel()[_name+"_binding"] = _value;
              }
            }
          }
          */
        }
        return this;
      }

      Property.type = function(v){
        if(v === undefined){
          return _type;
        }
        _type = (kc.isType.enum(v,_typeEnum) ? v : _type);
        return Property;
      }

      Property.propName = function(v){
        if(v === undefined){
          return _name;
        }
        _name = (kc.isType.string(v) ? v : _name);
        return Property;
      }

      Property.preprocess = function(v){
        if(v === undefined){
          return _preprocess;
        }
        _preprocess = (kc.isType.function(v) ? v : _preprocess);
        return Property;
      }

      Property.checkAgainst = function(v){
        if(v === undefined){
          return _checkAgainst;
        }
        _checkAgainst = v;
        return Property;
      }

      Property.isMethod = function(v){
        if(v === undefined){
          return _isMethod;
        }
        _isMethod = !!v;
        return Property;
      }

      return Property;
    }

    Object.defineProperty(module,'add',{
      get:function(){
        return add;
      },
      set:function(v){
        console.error('You cannot create an add method on a module as this method already exists, please declare differently');
      }
    });

    Object.defineProperty(module,'viewmodel',{
      get:function(){
        return _viewmodel;
      },
      set:function(v){
        if(_viewmodel === undefined){
          _viewmodel = v;
        }
        else{
          console.error('You cannot overwrite the viewmodel');
        }
      }
    });

    Object.defineProperty(module,'node',{
      get:function(){
        return _node;
      },
      set:function(v){
        if(_node === undefined){
          _node = v;
        }
        else{
          console.error('You cannot overwrite the base node');
        }
      }
    });

    return module;
}

define([],function(){return kc.Modularize});
define('Modularizer',function(){return kc.Modularize;});
