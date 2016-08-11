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
var _textEvents = ['innerHTML','outerHTML','textContent','innerText','outerText'],
    _onEvents = Object.keys(HTMLUnknownElement.prototype).filter(function(k){
      return (k.indexOf('on')  === 0);
    }),
    _attrEvents = function(el){
      return Array.prototype.slice.call(el.attributes)
        .map(function(k){return k.name;})
        .filter(function(k){return (k !== 'data-bind' && k !== 'id' && k !== 'class')});
    }

function integrateBindings(el){
  el.ko_override = {};
  el.ko_override.binds = {};


}

integrateBindings.getClassValue(prop,value){

}



define([],function(){return integrateBindings});
define('integrateBindings',function(){return integrateBindings;});
