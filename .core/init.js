function CreateModularizer(){
    var types = {
      string: function(v){
        return (typeof v === 'string');
      },
      number: function(v){
        return (typeof v === 'number');
      },
      boolean: function(v){
        return (typeof v === 'boolean');
      },
      function: function(v){
        return (typeof v === 'function');
      },
      object: function(v){
        return (v.constructor.toString() === Object.toString());
      },
      array: function(v){
        return (v.constructor.toString() === Array.toString());
      },
      instance: function(v,i){
        return (v instanceof i);
      },
      enum: function(v,e){
        return (e.indexOf(v) > -1);
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
          if(module.vm[k+"binding"]){
            if(module.vm[k+"binding"].toString() === ko.observable.toString()){
              if(module[k].type() !== 'array' && module[k].type() !== 'object' && module.vm[k+"binding"]().toString() !== module[k]().toString()){
                module[k](module.vm[k+"binding"]());
                /* in case of a preprocess */
                module.vm[k+"binding"](module[k]());
              }
              else if(module[k].type() === 'array' && module[k].type() === 'object'){
                module[k](module.vm[k+"binding"]());
                /* in case of a preprocess */
                module.vm[k+"binding"](module[k]());
              }
            }
            else{
              if(module[k].type() !== 'array' && module[k].type() !== 'object' && module.vm[k+"binding"].toString() !== module[k]().toString()){
                module[k](module.vm[k+"binding"]);
                /* in case of a preprocess */
                module.vm[k+"binding"] = module[k]();
              }
              else if(module[k].type() === 'array' && module[k].type() === 'object'){
                module[k](module.vm[k+"binding"]);
                /* in case of a preprocess */
                module.vm[k+"binding"] = module[k]();
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
          _checkAgainst = '';


      function Property(value){
        if(value === undefined){
          return _value;
        }
        if(types[_type](value,_checkAgainst))
        {
          _value = _preprocess(value);
          if(module.vm && module.vm[_name+"binding"]){
            if(module.vm[_name+"binding"].toString() === ko.observable.toString()){
              if(_type !== 'array' && _type !== 'object' && module.vm[_name+"binding"]().toString() !== _value.toString()){
                module.vm[_name+"binding"](_value);
              }
              else if(_type === 'array' && _type === 'object'){
                module.vm[_name+"binding"](_value);
              }
            }
            else{
              if(_type !== 'array' && _type !== 'object' && module.vm[_name+"binding"].toString() !== _value.toString()){
                module.vm[_name+"binding"] = _value;
              }
              else if(_type === 'array' && _type === 'object'){
                module.vm[_name+"binding"] = _value;
              }
            }
          }
        }
        return module;
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

      return Property;
    }

    return Modularizer;
}




require(['./.core/routes', './.core/override', 'crossroads', 'hasher'],function(routeConfig, override, crossroads, hasher){

  function router(){
    var routes = routeConfig.page_routes;
    function Router(config){
      var self = this,
          keys = Object.keys(config);

      this.routes = config;
      this.bindings = {};

      Object.keys(routes).forEach(function(k,i){
        self.bindings[k] = ko.observable(self.fetchRoute(k,'').params);
      });

      // Configure Crossroads route handlers
      keys.forEach(function(key,i){
        var conf = config[key],
            observer = self.bindings[key];


          conf.forEach(function(route,x){

            crossroads.addRoute(route.url, function(requestParams){

                self.filterRoutes(key,route.url,function(keyRoute,keyName){
                    if(keyRoute){
                      self.bindings[keyName](ko.utils.extend(JSON.parse(JSON.stringify(requestParams)), keyRoute.params));
                    }
                });
                observer(ko.utils.extend(requestParams, route.params));
            });
          });
      });

      crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
      hasher.initialized.add(hash => crossroads.parse(hash));
      hasher.changed.add(hash => crossroads.parse(hash));
      hasher.init();
    }

    Router.prototype.fetchRoute = function(type,url){
      for(var x=0;x<this.routes[type].length;x++){
        if(this.routes[type][x].url === url){
          return this.routes[type][x];
        }
      }
    }

    Router.prototype.filterRoutes = function(currentRoute,url,cb){
      var self = this;
      Object.keys(this.routes).filter(function(k,i){
        return k !== currentRoute;
      }).forEach(function(k,i){
        var route = self.fetchRoute(k,url);
        cb(route,k);
      })
    }


    // Create and export router instance
    return new Router(routes);
  }
  override();
  ko.punches.enableAll();
  ko.applyBindings(router().bindings);
});
