kc.CreateModularizer = function(){
    var types = {
      string: function(v){
        return (typeof v === 'string' ? v : undefined);
      },
      number: function(v){
        return (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : undefined);
      },
      boolean: function(v){
        return (typeof v === 'boolean' ? !!v : undefined);
      },
      function: function(v){
        return (typeof v === 'function' ? v : undefined);
      },
      object: function(v){
        return (v.constructor.toString() === Object.toString() ? v : undefined);
      },
      array: function(v){
        return (v.constructor.toString() === Array.toString() ? v : undefined);
      },
      instance: function(v,i){
        return (v instanceof i ? v : undefined);
      },
      enum: function(v,e){
        return (e.indexOf(v) > -1 ? v : undefined);
      }
    },
        module = function(){},
        props = {};

    function Modularizer(module){
      module = module;
      Object.keys(props).forEach(function(k,i){
        if(!module[k]){
          module[k] = props[k];
        }
        if(module.vm){
          if(module.vm[k+"_binding"]){
            if(ko.isObservable(module.vm[k+"_binding"])){
              if(module[k].type() !== 'array' && module[k].type() !== 'object' && module.vm[k+"_binding"]().toString() !== module[k]().toString()){
                module[k](module.vm[k+"_binding"]());
                /* in case of a preprocess */
                module.vm[k+"_binding"](module[k]());
              }
              else if(module[k].type() === 'array' && module[k].type() === 'object'){
                module[k](module.vm[k+"_binding"]());
                /* in case of a preprocess */
                module.vm[k+"_binding"](module[k]());
              }
            }
            else{
              if(module[k].type() !== 'array' && module[k].type() !== 'object' && module.vm[k+"_binding"].toString() !== module[k]().toString()){
                module[k](module.vm[k+"_binding"]);
                /* in case of a preprocess */
                module.vm[k+"_binding"] = module[k]();
              }
              else if(module[k].type() === 'array' && module[k].type() === 'object'){
                module[k](module.vm[k+"_binding"]);
                /* in case of a preprocess */
                module.vm[k+"_binding"] = module[k]();
              }
            }
          }
        }
      });
    }

    Modularizer.add = function(options){
      props[(options.name !== undefined ? options.name : 'default')] = CreateProperty()
      .type((options.type !== undefined ? options.type : 'string'))
      .propName((options.name !== undefined ? options.name : 'default'))
      .preprocess((options.preprocess !== undefined ? options.preprocess : function(v){return v;}))
      .checkAgainst((options.checkAgainst !== undefined ? options.checkAgainst : (options.type === 'enum' ? [] : (options.type === 'instance' ? this : ''))));
      props[(options.name !== undefined ? options.name : 'default')]((options.value !== undefined ? options.value : ''));
      return Modularizer;
    }

    function CreateProperty(){

      var _type = 'string',
          _typeEnum = Object.keys(types),
          _name = '',
          _value = '',
          _preprocess = function(v){return v;},
          _isMethod = false,
          _checkAgainst = '';


      function Property(value){
        if(value === undefined){
          return _value;
        }
        value = (types[_type](value,_checkAgainst) || false);
        if(value)
        {
          _value = _preprocess(value);
          if(typeof this.viewmodel === 'function' && this.viewmodel()[_name+"_binding"]){
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
        }
        return this;
      }

      Property.type = function(v){
        if(v === undefined){
          return _type;
        }
        _type = (types.enum(v,_typeEnum) ? v : _type);
        return Property;
      }

      Property.propName = function(v){
        if(v === undefined){
          return _name;
        }
        _name = (types.string(v) ? v : _name);
        return Property;
      }

      Property.preprocess = function(v){
        if(v === undefined){
          return _preprocess;
        }
        _preprocess = (types.function(v) ? v : _preprocess);
        return Property;
      }

      Property.checkAgainst = function(v){
        if(v === undefined){
          return _checkAgainst;
        }
        _checkAgainst = v;
        return Property;
      }

      Property.isMethod = function(){
        if(v === undefined){
          return _isMethod;
        }
        _isMethod = !!v;
        return Property;
      }

      return Property;
    }

    return Modularizer;
}

define([],function(){return kc.CreateModularizer});
define('Modularizer',function(){return kc.CreateModularizer;});
