/* This file help automate the creation of bindings and the
 * syncing of binds between the main component and the viewmodel.
 *
 * Created By Keleko34
 */

  /* Changes we need to keep track of on a component:
   * Text: html(properties), appendChild
   * Events: on(properties|attributes), addEventListener
   * Attributes: setAttribute, title, href, value !(id|class)
   * NOTE: We do not track class or id, they are problematic props.
   */

/* All text props */
var _htmlEvents = ['innerHTML','outerHTML','textContent','innerText','outerText'],
    _attrEvents = ['title','href','value','src'],
    _bindEvents = _htmlEvents.concat(_attrEvents).concat(Object.keys(HTMLUnknownElement.prototype).filter(function(k){
      return (k.indexOf('on')  === 0);
    })),
    _onTextBind = function(){},
    _onAttrBind = function(){},
    _onEventBind = function(){}

function integrateBindings(el){
  el.ko_override = (el.ko_override === undefined ? {} : el.ko_override);
  el.ko_override.parentBinds = (el.ko_override.parentBinds === undefined ? {} : el.ko_override.parentBinds);
  _bindEvents.concat(kc.getAttributes(el)).forEach(function(k,i){
    var value = undefined;
    if(k.indexOf('on') === 0){
      if(el.getAttribute(k)) value = integrateBindings.getAttrFunc(el,k);
    }
    integrateBindings.bindLinker(el,k,value);
  });

  el.addAttrListener('setAttribute',function(e){
    if(!el.ko_override.parentBinds[e.attr]){
      integrateBindings.bindLinker(el,e.attr,e.value);
      if(el.KC){
        if(el.KC[e.attr]){
          el.KC[e.attr](e.value);
        }
        else{

        }
      }
    }
  })
  el.addAttrListener('appendChild',function(e){

  })
}

/* removes attribute and returns function from attribute, for event based attributes */
integrateBindings.getAttrFunc = function(el,attr){
  var func = (kc.isObject(el) ? el.getAttribute(attr) : el.toString());
  if(kc.isObject(el)) el.removeAttribute(attr);
  return eval('(function(e){'+func+'})');
}

integrateBindings.onTextBind = function(func){
  _onTextBind = (typeof func === 'function' ? func : _onTextBind);
  return integrateBindings;
}

integrateBindings.onAttrBind = function(func){
  _onAttrBind = (typeof func === 'function' ? func : _onAttrBind);
  return integrateBindings;
}

integrateBindings.onEventBind = function(func){
  _onEventBind = (typeof func === 'function' ? func : _onEventBind);
  return integrateBindings;
}

/* This method connects the parent element attr to one way flow leading to the viewmodel */
integrateBindings.bindLinker = function(el,attr,value){
  var _value = (value ? value : (el.getAttribute(attr) || el[attr]));
  el.removeAttribute(attr);
  el[attr] = null;
  Object.defineProperty(el.ko_override.parentBinds,attr.toLowerCase(),{
    get:function(){
      return _value;
    },
    set:function(v){
      _value = v;
      if(el.KC){
        if(el.KC[attr] && el.KC[attr].isMethod && !el.KC[attr].isMethod()){
          el.KC[attr](v);
        }
      }
    }
  });
  el.addAttrListener(k,function(e){
    e.preventDefault();
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
}

integrateBindings.getClassValue = function(prop,value){

}



define([],function(){return integrateBindings});
define('integrateBindings',function(){return integrateBindings;});
