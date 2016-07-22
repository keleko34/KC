var textBindings = ['textContent','innerHTML'],
    eventBindings = function(el){
      return Object.keys(HTMLElement.prototype).filter(function(k){
        return (k.indexOf('on') > -1);
      });
    },
    attrBindings = function(el){
      return Array.prototype.slice.call(el.attributes)
      .map(function(k){return k.name;});
    }

define([],function(){

  var _binds = {};

  function CreateBinds(vm){

  }

  function checkEvent(t){
    return (t.indexOf('on') === 0);
  }

  CreateBinds.attachBinds(el){
    var bindings = textBindings.concat(eventBindings(el)).concat(attrBindings(el));

    bindings.forEach(function(k,i){
      if(k.indexOf('on') === 0){
        _binds[k] = (el[k] || (el.getAttribute(k) ? eval('(function(e){'+el.getAttribute(k)+'})') : undefined));
      }
      else{
        _binds[k] = (el[k] || el.getAttribute(k));
      }
      if(textBindings.indexOf(k) < 0){

        el.addAttrListener(k,function(e){
          /* if Element has a viewmodel yet */
          if(el.KViewModel){

            /* If property already exists */
            if(el.KViewModel[k]){

              /* if property is ko observable */
              if(el.KViewModel[k].toString() === ko.observable.toString()){
                el.KViewModel[k](e.value);
              }
              else{
                el.KViewModel[k] = e.value;
              }

              /* Set method properties as well */
              el.KViewModel.methods();

              /* Prevent it from being set */
              e.preventDefault();
            }
            else{

            }
          }
        });
      }
    });

    return CreateBinds;
  }

  return CreateBinds;
});
