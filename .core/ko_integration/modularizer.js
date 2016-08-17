kc.CreateModularizer = function(module){
    var types = {
      string: function(v,c){
        return (typeof v === 'string' && v !== c ? v : undefined);
      },
      number: function(v,c){
        return ((typeof v === 'number' || !isNaN(parseInt(v,10))) && parseInt(v,10) !== c ? parseInt(v,10) : undefined);
      },
      boolean: function(v,c){
        return (typeof v === 'boolean' && v !== c ? !!v : undefined);
      },
      function: function(v,c){
        return (typeof v === 'function' && v.toString() !== c.toString() ? v : undefined);
      },
      object: function(v,c){
        var r = false;
        try{
          r = (kc.isObject(v) && JSON.stringify(v) !== JSON.stringify(c));
        }
        catch(e){
          console.warn('Warning circular objects are difficult to keep in sync, try using different methodology old: ',c,' new:',v);
          r = true;
        }
        return (r ? v : undefined);
      },
      array: function(v,c){
        var r = false;
        try{
          r = (kc.isArray(v) && JSON.stringify(v) !== JSON.stringify(c));
        }
        catch(e){
          console.warn('Warning circular arrays are difficult to keep in sync, try using different methodology old: ',c,' new:',v);
          r = true;
        }
        return (r ? v : undefined);
      },
      instance: function(v,c,i){
        return (v instanceof i ? v : undefined);
      },
      enum: function(v,c,e){
        return (e.indexOf(v) > -1 && v !== c ? v : undefined);
      }
    },
        _module = module,
        _viewmodel = {},
        props = {};

    module = (function(){
      var m = _module();
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
      return m;
    }).bind(module)


    function add(options){
      props[(options.name !== undefined ? options.name : 'default')] = CreateProperty()
      .type((options.type !== undefined ? options.type : 'string'))
      .propName((options.name !== undefined ? options.name : 'default'))
      .preprocess((options.preprocess !== undefined ? options.preprocess : function(v){return v;}))
      .checkAgainst((options.checkAgainst !== undefined ? options.checkAgainst : (options.type === 'enum' ? [] : (options.type === 'instance' ? this : ''))));
      props[(options.name !== undefined ? options.name : 'default')]((options.value !== undefined ? options.value : ''));
      return module;
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
        value = (types[_type](value,_value,_checkAgainst) || false);
        if(value)
        {
          _value = _preprocess(value);
          /* may no longer needed as we apply updates based on constructor call
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
          */
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
        console.error('You cannot reset the viewmodel');
      }
    });



    return Modularizer;
}

define([],function(){return kc.CreateModularizer});
define('Modularizer',function(){return kc.CreateModularizer;});
