/* This file help automate the creation of bindings and the
 * syncing of binds between the main component and the viewmodel.
 *
 * Created By Keleko34
 */

  /* Changes we need to keep track of on a component:
   * Text: html(properties), appendChild
   * Events: on(properties|attributes), addEventListener
   * Attributes: setAttribute, title, href, value !(id|class|style)
   * NOTE: We do not track class or id, they are problematic props.
   */

/* All text properties */
var _htmlEvents = ['innerHTML','outerHTML','textContent','innerText','outerText'],

    /* standard attributes, more can be added except id and class and style */
    _attrEvents = ['title','href','value','src'],

    /* list of all possible events on an element */
    _bindEvents = _htmlEvents.concat(_attrEvents.filter(function(v){return (['id','class','style'].indexOf(v) < 0)}))
    .concat(Object.keys(HTMLElement.prototype).filter(function(k){return (k.indexOf('on')  === 0);})),
    _onTextBind = function(){},
    _onAttrBind = function(){},
    _onEventBind = function(){}

function integrateBindings(el){
  el.ko_override = (el.ko_override === undefined ? {} : el.ko_override);

  /* top of the chain important object containing all the parent component attributes to bind to the childs */
  el.ko_override.parentBinds = (el.ko_override.parentBinds === undefined ? {} : el.ko_override.parentBinds);

  el.ko_override.bindChain = integrateBindings.bindChain;
  el.ko_override.setParentBinds = integrateBindings.setParentBinds;

  _bindEvents.concat(kc.getAttributes(el)).forEach(function(k,i){
    var value = undefined;
    if(k.indexOf('on') === 0){
      if(el.getAttribute(k)) value = integrateBindings.getAttrFunc(el,k);
    }
    /* we link and bind the attribute here */
    integrateBindings.bindLinker(el,k,value);
  });

  /* whenever a dev does a set attribute on a component we listen and update or add appropriately */
  el.addAttrListener('setAttribute',function(e){
    e.preventDefault();
    e.p_attr = e.attr;
    e.attr = e.attr.toLowerCase();
    if(e.attr.indexOf('on') === 0) e.value = integrateBindings.getAttrFunc(e.value);

    /* if attr bind doesnt exist we create it */
    if(!el.ko_override.parentBinds[e.attr]){
      if(el.KC){
        if(el.KC[e.attr] && el.KC[e.attr].isMethod && !el.KC[e.attr].isMethod()){
          el.KC[e.attr](e.value);
        }
        else{
          integrateBindings.createModuleDef(el,e.attr,e.value);
          el.KC.call();
        }
      }
      integrateBindings.bindLinker(el,e.p_attr,(el.KC ? el.KC[e.attr]() : e.value));
    }
    else{
      el.ko_override.parentBinds[e.attr] = e.value;
    }
    if(e.attr.indexOf('on') === 0){
      _onEventBind(el);
    }
    else{
      _onAttrBind(el);
    }
  })

  /* appending or removing children from the component itself is not permitted */
  .addAttrListener('appendChild',function(e){
    if(e.target.innerHTML > 0){
      e.preventDefault();
    }
  });

}

/* removes attribute and returns function from attribute, for event based attributes */
integrateBindings.getAttrFunc = function(el,attr){
  var func = (kc.isObject(el) ? el.getAttribute(attr) : el.toString());
  if(kc.isObject(el)) el.removeAttribute(attr);
  return eval('(function(e){'+func+'})');
}

/* ran whenever a textbinding changes */
integrateBindings.onTextBind = function(func){
  _onTextBind = (typeof func === 'function' ? func : _onTextBind);
  return integrateBindings;
}

/* ran whenever a attrbinding changes */
integrateBindings.onAttrBind = function(func){
  _onAttrBind = (typeof func === 'function' ? func : _onAttrBind);
  return integrateBindings;
}

/* ran whenever an eventbinding changes */
integrateBindings.onEventBind = function(func){
  _onEventBind = (typeof func === 'function' ? func : _onEventBind);
  return integrateBindings;
}

/* This method connects the parent element attr to one way flow leading to the viewmodel */
integrateBindings.bindLinker = function(el,attr,value){
  var _value = (value !== undefined ? value : (el.getAttribute(attr) || el[attr]));
  el.removeAttribute(attr);
  delete el[attr];

  var k_attr = attr;
  attr = attr.toLowerCase();
  Object.defineProperty(el.ko_override.parentBinds,attr.toLowerCase(),{
    enumerable:true,
    get:function(){
      return _value;
    },
    set:function(v){
      _value = v;
      if(el.KC){
        if(el.KC[attr] && el.KC[attr].isMethod && !el.KC[attr].isMethod()){
          el.KC[attr](v);
          _value = el.KC[attr]();

          /* should we call here?
           * This will loop through all attr and set viewmodel each time a value changes
           */
          el.KC.call();
        }
      }
    }
  });
  el.addAttrListener(k_attr,function(e){
    e.preventDefault();
    e.attr = e.attr.toLowerCase();
    el.ko_override.parentBinds[e.attr] = e.value;
    if(_htmlEvents.indexOf(e.attr) > -1){
      _onTextBind(el);
    }
    else if(e.attr.indexOf('on') === 0){
      _onEventBind(el);
    }
    else{
      _onAttrBind(el);
    }
  });
  return integrateBindings;
}

integrateBindings.createModuleDef = function(el,attr,value){
  el.KC.add({
    name:attr,
    type:(!isNaN(parseInt(value,10)) ? 'number' : (typeof value)),
    value:value
  })
  return integrateBindings;
}

integrateBindings.bindChain = function(vm,el,attr,value){
  var prop = vm[attr+"_binding"];

  function set(v){
    var _v = kc.isType[el.KC[attr].type()](v,el.ko_override.parentBinds[attr],el.KC[attr].checkAgainst());
    if(_v) el.ko_override.parentBinds[attr] = _v;
  }

  if(ko.isObservable(prop)){
    prop.subscribe(set);
  }
  else {
    Object.defineProperty(vm,(attr+"_binding"),{
      get:function(){
        return el.KC[attr]();
      },
      set:set
    });
  }
}

integrateBindings.setParentBinds = function(vm,el){
  Object.keys(el.ko_override.parentBinds).forEach(function(k){
    if(!vm[k+"_binding"]){
      integrateBindings.createModuleDef(el,k,el.ko_override.parentBinds[k]);
    }
    else{
      if(ko.isObservable(vm[k+"_binding"])){
        if(vm[k+"_binding"]() === undefined || vm[k+"_binding"] === null){
          vm[k+"_binding"](el.ko_override.parentBinds[k]);
        }
      }
      else{
        integrateBindings.bindChain(_viewmodel,el,k,el.ko_override.parentBinds[k]);
      }
    }
  });
  el.KC.call();
  return integrateBindings;
}



define([],function(){return integrateBindings});
define('integrateBindings',function(){return integrateBindings;});
