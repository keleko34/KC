define([],function(){

  kc.Modularize = function(func){
      var _func = func,
          _viewmodel,
          _node,
          _cms_node,
          props = {};

      function module(){

        _update();

        if(_node.KC) module._main.call(module);
        return module;
      }

      function _update(){
        /* Here we update all viewmodel attributes */
        Object.keys(props).forEach(function(k,i){

          /* we do not add or update isMethods or instances */
          if(module[k].isMethod && !module[k].isMethod() && module[k].type() !== 'instance'){

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
            if(module[_name] !== undefined){
              if(!_viewmodel[_name+"_binding"]){
                _viewmodel[_name+"_binding"] = (module[_name].type() !== 'function' ? ko.observable() : module[_name]());
                kc.override.bindings.addToViewModel(_viewmodel,_name,module[_name]());
              }
              else{
                kc.override.bindings.addToViewModel(_viewmodel,_name,module[_name]());
              }
              if(ko.isObservable(_viewmodel[_name+"_binding"])){
                _viewmodel[_name+"_binding"](module[_name]());
              }
              else{
                _viewmodel[_name+"_binding"] = module[_name]();
              }
            }
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
            module.cms_node = (_node.ko_override.cms ? _node.ko_override.cms.node : undefined);
          }
          else{
            console.error('You cannot overwrite the base node');
          }
        }
      });

      Object.defineProperty(module,'cms_node',{
        get:function(){
          return _cms_node;
        },
        set:function(v){
          if(_cms_node === undefined){
            _cms_node = v;
          }
          else{
            console.error('You cannot overwrite the base cms_node');
          }
        }
      });

      Object.defineProperty(module,'_main',{
          get:function(){
            return _func;
          },
          set:function(v){
              console.error('You cannot overwrite the base method');
          }
        });

      Object.defineProperty(module,'_update',{
          get:function(){
            return _update;
          },
          set:function(v){
              console.error('You cannot overwrite the base method');
          }
        });

      return module;
  }

  return kc.Modularize;
})
