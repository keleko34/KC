/*jslint white:true, browser:true, nomen: true*/

define([],function(){
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

            if(_typeCheck.isValid && _writable)
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
});
