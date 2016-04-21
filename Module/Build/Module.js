var CreateModule = (function(){
	function CreateModule(moduleName,module){

      /* BUILD SECTION */
      /*jslint white:true, browser:true, nomen: true*/

var CreateProperty = (function(){
    "use strict";
    function CreateProperty()
    {
        var _propertyName = "",
            _value,
            _module,
            _moduleName,
            _isPrivate = false,
            _isFunction = false,
            _configurable = false,
            _enumerable = true,
            _writable = true,
            _onChange = function(){},
            _loadedFrom,
            _sharedModules = {},
            _isConstructor = false,
            _isModuleScoped = true,
            _prototype = {},
            _type = 'string',
            _typeEnum = ['string','number','object','boolean','function','float','array','class'],
            _typeClass = function(){};

        function Property(value)
        {
            var _scopeIsConstructor = Property.isConstructor(),
                _scopeIsFunction = Property.isFunction(),
                _scopeValue = Property.value(),
                _scopeIsModuleScoped = Property.isModuleScoped(),
                _scopeModule = Property.module(),
                _scopeName,
                _scopeSharedModules,
                _scopeSharedModuleKeys,
                _scopeX,
                _scopeEvent,
                _currentModuleProp,
                _typeCheck = Property['type'+_type](value);

            if(value === undefined || _scopeIsFunction || _scopeIsConstructor)
            {
              if(_scopeIsFunction || _scopeIsConstructor)
              {
                if(_scopeIsConstructor)
                {
                  var args = Array.prototype.slice.call(arguments);
                  args.unshift(0);
                  return new (_scopeValue.bind.apply(_scopeValue,args))();
                }
                if(_scopeIsModuleScoped)
                {
                  return _scopeValue.apply(_scopeModule,arguments);
                }
                return _scopeValue.apply(_scopeValue,arguments);
              }
              return _scopeValue;
            }

            if(_typeCheck.isValid)
            {
              _scopeName = Property.propertyName();
              _scopeSharedModules = Property.sharedModules();
              _scopeSharedModuleKeys = Object.keys(_scopeSharedModules);
              _scopeEvent = {
                stopPropagation:function(){this._stopPropagation = true;},
                value:value,
                propertyName:_scopeName,
                _stopPropagation:false,
                changeOrigin:_scopeModule
              };
              _scopeEvent.stopPropagation.bind(_scopeEvent);
              Property.value(_typeCheck.value);
              for(_scopeX=0;_scopeX<_scopeSharedModuleKeys.length;_scopeX+=1)
              {
                if(_scopeEvent._stopPropagation)
                {
                  break;
                }
                if(_scopeSharedModules[_scopeSharedModuleKeys[_scopeX]] !== undefined)
                {
                  _currentModuleProp = _scopeSharedModules[_scopeSharedModuleKeys[_scopeX]][_scopeName];
                  if(_currentModuleProp.isModuleScoped())
                  {
                    (_currentModuleProp.onChange()).call(_currentModuleProp.module(),_scopeEvent);
                  }
                  else
                  {
                    (_currentModuleProp.onChange()).call(_currentModuleProp.onChange(),_scopeEvent);
                  }
                }
              }
            }
            return _scopeModule;
        }

        Property.propertyName = function(n) //Pure
        {
            if(n === undefined)
            {
                return _propertyName;
            }
            _propertyName = n.toString();
            return this;
        };
        Property.value = function(v) //Pure
        {
            if(v === undefined)
            {
                return _value;
            }
            _value = v;
            return this;
        };
        Property.module = function(m) //Pure
        {
            if(m === undefined)
            {
                return _module;
            }
            _module = m; //Pointer;
            return this;
        };
        Property.moduleName = function(n) //Pure
        {
            if(n === undefined)
            {
                return _moduleName;
            }
            _moduleName = n.toString();
            return this;
        };
        Property.isPrivate = function(isP) //Pure
        {
            if(isP === undefined)
            {
                return _isPrivate;
            }
            _isPrivate = !!isP;
            return this;
        };
        Property.isFunction = function(isF) //Pure
        {
            if(isF === undefined)
            {
                return _isFunction;
            }
            _isFunction = !!isF;
            return this;
        };
        Property.configurable = function(c) //Pure
        {
            if(c === undefined)
            {
                return _configurable;
            }
            _configurable = !!c;
            return this;
        };
        Property.enumerable = function(e) //Pure
        {
            if(e === undefined)
            {
                return _enumerable;
            }
            _enumerable = !!e;
            return this;
        };
        Property.writable = function(w) //Pure
        {
            if(w === undefined)
            {
                return _writable;
            }
            _writable = !!w;
            return this;
        };
        Property.onChange = function(onC) //Pure
        {
            if(onC === undefined)
            {
                return _onChange;
            }
            _onChange = (typeof onC === 'function' ? onC : function(){});
            return this;
        };
        Property.loadedFrom = function(lF) //Pure
        {
            if(lF === undefined)
            {
                return _loadedFrom;
            }
            _loadedFrom = lF;
            return this;
        };
        Property.sharedModules = function(n,m) //Pure
        {
            if(n === undefined)
            {
                return _sharedModules;
            }
            else if(m === undefined)
            {
                _sharedModules = n;
                return this;
            }
            _sharedModules[n] = m;
            return this;
        };
        Property.isConstructor = function(isC) //Pure
        {
            if(isC === undefined)
            {
                return _isConstructor;
            }
            _isConstructor = !!isC;
            return this;
        };
        Property.isModuleScoped = function(isMS) //Pure
        {
            if(isMS === undefined)
            {
                return _isModuleScoped;
            }
            _isModuleScoped = !!isMS;
            return this;
        };
        Property.type = function(t) //pure
        {
          if(t === undefined)
          {
            return _type;
          }
          _type = (_typeEnum.indexOf(t) > -1 ? v : _type);
          return Property;
        }
        Property.typeClass = function(c) //pure
        {
          if(c === undefined)
          {
            return _typeClass;
          }
          _typeClass = (typeof c === 'function' ? c : _typeClass);
          return Property;
        }
        Property.prototype = function(n,p) //Impure Side Effect to Property.value() by adding prototypes to the returned function assuming its a constructor
        {
            if(n === undefined)
            {
                return _prototype;
            }
            if(p === undefined)
            {
                _prototype = n;
                Property.value().prototype = n;
                return this;
            }
            _prototype[n.toString()] = p;
            Property.value().prototype[n.toString()] = p;
            return this;
        };

        /* types */
        Property.typestring = function(v) //Pure
        {
          return {isValid:(typeof v === 'string' || v.toString() !== '[Object object]'),value:v.toString()};
        }

        Property.typenumber = function(v) //Pure
        {
          return {isValid:(typeof v === 'number' || !isNaN(parseInt(v,10))),value:parseInt(v,10)};
        }

        Property.typeobject = function(v) //Pure
        {
          return {isValid:(typeof v === 'object' && v.constructor.toString() === Object.toString()),value:v};
        }

        Property.typeboolean = function(v) //Pure
        {
          return {isValid:(typeof v === 'boolean' || !!v !== undefined),value:!!v};
        }

        Property.typefunction = function(v) //Pure
        {
          return {isValid:(typeof v === 'function'),value:v};
        }

        Property.typefloat = function(v) //Pure
        {
          return {isValid:(typeof v === 'number' || !isNaN(parseFloat(v))),value:parseFloat(v)};
        }

        Property.typearray = function(v) //Pure
        {
          return {isValid:(typeof v === 'object' && v.constructor.toString() === Array.toString()),value:v};
        }

        Property.typeclass = function(v) //Pure
        {
          return {isValid:(v.toString() === _typeClass.toString()),value:v};
        }

        Property.typepath = function(v)
        {
          return {isValid:(typeof v === 'string' && (v.indexOf('/') === 0 || v.indexOf(':') === 1)),value:v};
        }

        return Property;
    }
    return CreateProperty;
}());;




      /* END BUILD SECTION */

      var _moduleName = "",
            _module = "",
            _parentModules = {},
            _childModules = {},
            _loadGroups = {};

        function Module()
        {
            var _scopeX,
                _scopeChildModules = Module.childModules(),
                _scopeChildModuleKeys = Object.keys(_scopeChildModules),
                _currentKey;
            for(_scopeX=0;_scopeX<_scopeChildModuleKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeChildModules[_scopeChildModuleKeys[_scopeX]];
                if(_currentKey !== undefined)
                {
                    _currentKey.apply(this,arguments);
                }
            }
        }

        Module.setModuleName = function(n) //Pure
        {
            if(n === undefined)
            {
                return _moduleName;
            }
            _moduleName = n;
            return Module;
        };
        Module.setModule = function(m) //Impure side effects adds _ModuleLoader object to input
        {
            if(m === undefined)
            {
                return _module;
            }
            _module = m;
            var _ModuleLoader = {};
            _ModuleLoader.moduleName = Module.setModuleName;
            _ModuleLoader.parentModules = Module.parentModules;
            _ModuleLoader.createGetSetFunction = Module.createGetSetFunction;
            Object.defineProperty(m,'_ModuleLoader',{
                value:_ModuleLoader,
                writable:false,
                enumerable:false,
                configurable:false
            });
            return Module;
        };
        Module.parentModules = function(n,m) //Pure
        {
            if(n === undefined)
            {
                return _parentModules;
            }
            if(m === undefined)
            {
                _parentModules = n;
                return Module;
            }
            _parentModules[n] = m;
            return Module;
        };
        Module.childModules = function(n,m) //Pure
        {
            if(n === undefined)
            {
                return _childModules;
            }
            if(m === undefined)
            {
                _childModules = n;
                return Module;
            }
            _childModules[n] = m;
            return Module;
        };
        Module.setLoadGroup = function(n,arrM) //Pure
        {
            if(n === undefined)
            {
                return _loadGroups;
            }
            if(arrM === undefined)
            {
                _loadGroups = n;
                return Module;
            }
            if(arrM.constructor === Object)
            {
                arrM = Object.keys(arrM).map(function(m,i){
                    return arrM[m];
                });
            }
            _loadGroups[n] = (arrM.constructor === Array ? arrM.splice(0) : []); //assumes single dimenson array
            return Module;
        };

        /* Service Functions */
        Module.convertToOOP = function(funcObject)
        {
            var _scopeKeys = Object.keys(funcObject),
                _scopeX,
                _currentProp,
                _returnObject = {};
            for(_scopeX=0;_scopeX<_scopeKeys.length;_scopeX+=1)
            {
                _currentProp = funcObject[_scopeKeys[_scopeX]];
                if(typeof _currentProp === 'function')
                {
                   _returnObject[_scopeKeys[_scopeX]] = _currentProp();
                }
            }
            return _returnObject;
        };
        Module.createGetSetFunction = function(options) //creates properties on included module
        {
            options.module = (typeof options.module !== 'object' ? Module.setModule() : options.module);
            options.moduleName = (typeof options.moduleName !== 'string' ? options.module._ModuleLoader.moduleName() : options.moduleName);

            var _scopeProperty = CreateProperty();
            _scopeProperty.module(options.module);
            _scopeProperty.moduleName(options.moduleName);
            _scopeProperty.propertyName(options.propertyName);
            _scopeProperty.value(options.value);
            _scopeProperty.isPrivate(options.isPrivate);
            _scopeProperty.isFunction(options.isFunction);
            _scopeProperty.writable(options.writable);
            _scopeProperty.configurable(options.configurable);
            _scopeProperty.enumerable(options.enumerable);
            _scopeProperty.onChange(options.onChange);
            _scopeProperty.loadedFrom(options.loadedFrom);
            _scopeProperty.sharedModules(options.sharedModules);
            _scopeProperty.sharedModules(options.moduleName,options.module)
            _scopeProperty.isConstructor(options.isConstructor);
            _scopeProperty.isModuleScoped(options.isModuleScoped);
            _scopeProperty.type(options.type);
            _scopeProperty.typeClass(options.typeClass);
            if(_scopeProperty.isConstructor())
            {
                _scopeProperty.prototype(options.prototype);
            }

            Object.defineProperty(_scopeProperty.module(),_scopeProperty.propertyName(),{
                get:function(){return _scopeProperty;},
                set:function(v){
                    if(_scopeProperty.writable())
                    {
                        _scopeProperty(v);
                    }
                },
                configurable:true,
                enumerable:_scopeProperty.enumerable()
            });

            return Module;
        };
        Module.loadProperty = function(from,to,name) //this loads a property from From input child to To input parent
        {
            from[name].sharedModules(to._ModuleLoader.moduleName(),to);
            var _scopeFromProperty = from[name],
                _scopeToProperty,
                _scopeFromPropertyToOOP = Module.convertToOOP(_scopeFromProperty),
                _scopeChildModules,
                _scopeChildModuleKeys,
                _scopeX,
                _currentKey;
            _scopeFromPropertyToOOP.module = undefined;
            _scopeFromPropertyToOOP.moduleName = undefined;
            _scopeFromPropertyToOOP.onChange = undefined;
            _scopeFromPropertyToOOP.loadedFrom = from._ModuleLoader.moduleName();
            //create Property
            to._ModuleLoader.createGetSetFunction(_scopeFromPropertyToOOP);
            _scopeToProperty = to[name];

            //reReference to children

            _scopeChildModules = _scopeToProperty.sharedModules();
            _scopeChildModuleKeys = Object.keys(_scopeChildModules);
            for(_scopeX=0;_scopeX<_scopeChildModuleKeys.length;_scopeX+=1)
            {
                if(_scopeChildModules[_scopeChildModuleKeys[_scopeX]] !== undefined)
                {
                    _currentKey = _scopeChildModules[_scopeChildModuleKeys[_scopeX]][name];
                    _currentKey.sharedModules = _scopeToProperty.sharedModules;
                    _currentKey.propertyName = _scopeToProperty.propertyName;
                    _currentKey.isPrivate = _scopeToProperty.isPrivate;
                    _currentKey.isFunction = _scopeToProperty.isFunction;
                    _currentKey.enumerable = _scopeToProperty.enumerable;
                    _currentKey.writable = _scopeToProperty.writable;
                    _currentKey.value = _scopeToProperty.value;
                    _currentKey.prototype = _scopeToProperty.prototype;
                }

            }

            return Module;
        };
        Module.inheritProperty = function(from,to,name) //this is ran when both child and parent have the same property, thus To input is child and inherits from From input parent
        {
            var _scopeFromProperty = from[name],
                _scopeToProperty = to[name],
                _scopeChildModules = _scopeToProperty.sharedModules(),
                _scopeChildModuleKeys = Object.keys(_scopeChildModules),
                _scopeX,
                _currentKey,
                _eventObject = {
                    propertyName:name,
                    stopPropagation:function(){this._stopPropagation = true;},
                    value:undefined,
                    _stopPropagation:false,
                    changeOrigin:undefined
                };
            _eventObject.stopPropagation.bind(_eventObject);
            if(!_scopeToProperty.configurable() && !_scopeFromProperty.isFunction() && !_scopeFromProperty.isConstructor())
            {
                _scopeFromProperty.value(_scopeToProperty.value());
            }


            for(_scopeX=0;_scopeX<_scopeChildModuleKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeChildModuleKeys[_scopeX];
                if(_scopeChildModules[_scopeChildModuleKeys[_scopeX]] !== undefined)
                {
                    _scopeFromProperty.sharedModules(_currentKey,_scopeChildModules[_currentKey]);
                    _currentKey = _scopeChildModules[_scopeChildModuleKeys[_scopeX]][name];
                    _currentKey.sharedModules = _scopeFromProperty.sharedModules;
                    _currentKey.propertyName = _scopeFromProperty.propertyName;
                    _currentKey.isPrivate = _scopeFromProperty.isPrivate;
                    _currentKey.isFunction = _scopeFromProperty.isFunction;
                    _currentKey.enumerable = _scopeFromProperty.enumerable;
                    _currentKey.writable = _scopeFromProperty.writable;
                    _currentKey.value = _scopeFromProperty.value;
                    _currentKey.prototype = _scopeFromProperty.prototype; //needs handled differently
                    Object.defineProperty(_scopeChildModules[_scopeChildModuleKeys[_scopeX]],name,{
                        enumerable:_scopeFromProperty.enumerable()
                    });
                    if(!_currentKey.isFunction() && !_currentKey.isConstructor())
                    {
                        _eventObject.value = _scopeFromProperty.value();
                        _eventObject.changeOrigin = _scopeFromProperty.module();
                        if(_currentKey.isModuleScoped())
                        {
                            _currentKey.onChange().call(_currentKey.module(),_eventObject);
                        }
                        else
                        {
                           _currentKey.onChange().call(_currentKey.onChange(),_eventObject);
                        }
                    }
                }
            }
            //need to handle different prototypes.... will think on this..

            return Module;
        };
        Module.loadProperties = function(from,to) //add properties to To input object and alters some properties in From input
        {
            var _scopeFromPropertyKeys = Object.keys(from),
                _scopeParents = to._ModuleLoader.parentModules(),
                _scopeParentKeys = Object.keys(_scopeParents),
                _scopeX,
                _currentKey;

            //load properties to self
            for(_scopeX=0;_scopeX<_scopeFromPropertyKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeFromPropertyKeys[_scopeX];
                if(to[_currentKey] === undefined)
                {
                    Module.loadProperty(from,to,_currentKey);
                }
                else
                {
                    Module.inheritProperty(to,from,_currentKey);
                }
            }

            //propagate to parents
            for(_scopeX=0;_scopeX<_scopeParentKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeParents[_scopeParentKeys[_scopeX]];
                if(_currentKey !== undefined)
                {
                    Module.loadProperties(from,_currentKey);
                }
            }
            return Module;
        };
        Module.unloadProperties = function(self,from) //removes properties from module from Self input of all the properties from From Input. this also propogates up the chain.
        {
            var _scopeName = from._ModuleLoader.moduleName(),
                _scopeParents = self._ModuleLoader.parentModules(),
                _scopeParentsKeys = Object.keys(_scopeParents),
                _scopeFromPropertyKeys = Object.keys(from),
                _scopeX,
                _currentKey;

            //unload properties from self
            for(_scopeX=0;_scopeX<_scopeFromPropertyKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeFromPropertyKeys[_scopeX];
                if(self[_currentKey].loadedFrom() === _scopeName)
                {
                    self[_currentKey].sharedModules()[self._ModuleLoader.moduleName()] = undefined;
                    delete self[_currentKey];
                }
            }

            //propagate to parents
            for(_scopeX=0;_scopeX<_scopeParentsKeys.length;_scopeX+=1)
            {
                _currentKey = _scopeParents[_scopeParentsKeys[_scopeX]];
                if(_currentKey !== undefined)
                {
                    Module.unloadProperties(_currentKey,from);
                }
            }

            return Module;
        };
        Module.loadModule = function(m) //This starts the loading process for a module
        {
            var _scopeModule = Module.setModule();
            Module.loadProperties(m,_scopeModule);
            m._ModuleLoader.parentModules(Module.setModuleName(),_scopeModule);
            Module.childModules(m._ModuleLoader.moduleName(),m);
            return Module;
        };
        Module.unloadModule = function(n) // starts the unloading process and releases some properties
        {
            var _scopeChildModuleName,
                _scopeChildModule,
                _scopeModule = Module.setModule();
            if(typeof n === 'string')
            {
                _scopeChildModuleName = n;
                _scopeChildModule = Module.childModules()[n];
            }
            else
            {
                _scopeChildModule = n;
                _scopeChildModuleName = n._ModuleLoader.moduleName();
            }
            if(_scopeChildModule !== undefined)
            {
                Module.unloadProperties(_scopeModule,_scopeChildModule);
                _scopeChildModule._ModuleLoader.parentModules()[Module.setModuleName()] = undefined;
                Module.childModules()[_scopeChildModuleName] = undefined;
            }
            return Module;
        };
        Module.getLoadGroup = function(n) //gets a callback function for use in a .call that calls the constructors of a set group in order
        {
            var _scopeGroup = Module.setLoadGroup()[n],
                _scopeX,
                _currentKey;
            return function()
            {
                for(_scopeX=0;_scopeX<_scopeGroup.length;_scopeX+=1)
                {
                    _currentKey = Module.childModules()[_scopeGroup[_scopeX]];
                    if(_currentKey !== undefined)
                    {
                        _currentKey.apply(this,arguments);
                    }

                }
            };
        };

        if(module !== undefined)
        {
            Module.setModule(module);
        }
        if(moduleName !== undefined)
        {
            Module.setModuleName(moduleName)
        }

        return Module;

	}
	return CreateModule;
}())
