/* This file help automate the creation of bindings and the
 * syncing of binds between the main component and the viewmodel.
 *
 * Created By Keleko34
 */

  /* Changes we need to keep track of on a component:
   * Text: html(properties), appendChild, removeChild
   * Events: on(properties|attributes), addEventListener
   * Attributes: setAttribute, removeAttribute, title, href, value !(id|class)
   * NOTE: We do not track class or id, they are problematic props.
   */

/* All text props */
var _bindEvents = ['innerHTML','outerHTML','textContent','innerText','outerText']
    .concat(Object.keys(HTMLUnknownElement.prototype).filter(function(k){
      return (k.indexOf('on')  === 0);
    }))

function integrateBindings(el){
  el.ko_override = (el.ko_override === undefined ? {} : el.ko_override);
  el.ko_override.binds = (el.ko_override.binds === undefined ? {} : el.ko_override.binds);
  _bindEvents.concat(kc.getAttributes(el)).forEach(function(k,i){

  });

}

/* removes attribute and returns function from attribute, for event based attributes */
integrateBindings.getAttrFunc = function(el,attr){
  var func = (kc.isObject(el) ? el.getAttribute(attr) : el.toString());
  if(kc.isObject(el)) el.removeAttribute(attr);
  return eval('(function(e){'+func+'})');
}

integrateBindings.getClassValue = function(prop,value){

}



define([],function(){return integrateBindings});
define('integrateBindings',function(){return integrateBindings;});
