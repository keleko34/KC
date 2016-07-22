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

  /* This method gets called during template construction, after the viewmodel has been created */
  function CreateBinds(vm){
      _binds
  }

  function setBinds(el,attr,value,e){
    /* if Element has a viewmodel yet */
    if(el.KViewModel){

      /* If property already exists */
      if(el.KViewModel[attr+"_binding"]){

        /* if property is ko observable */
        if(el.KViewModel[attr+"_binding"].toString() !== ko.observable.toString()){
          el.KViewModel[attr+"_binding"] = (typeof value === 'string' ? eval('(function(e){'+value+'})') : value);
        }
        else{
          el.KViewModel[attr+"_binding"](value);
        }

        /* Set method properties as well */
        el.KViewModel.methods();

        /* Prevent it from being set */
        e.preventDefault();
      }
      else{

        /* check if is event */
        if(attr.indexOf('on') === 0){
          el.KViewModel[attr+"_binding"] = (typeof value === 'string' ? eval('(function(e){'+value+'})') : value);
        }
        else{
          el.KViewModel[attr+"_binding"] = ko.observable(value);
        }

        /* Set method properties as well */
        el.KViewModel.methods();

        /* Prevent it from being set */
        e.preventDefault();
      }
    }
  }

  /* This method gets called prior to template construction when the component element is being read */
  CreateBinds.attachBinds(el){
    textBindings.concat(eventBindings(el)).concat(attrBindings(el)).forEach(function(k,i){
      if(k.indexOf('on') === 0){
        _binds[k] = (el[k] || (el.getAttribute(k) ? eval('(function(e){'+el.getAttribute(k)+'})') : undefined));
      }
      else{
        _binds[k] = (el[k] || el.getAttribute(k));
      }
      if(textBindings.indexOf(k) < 0){
        el.addAttrListener(k,function(e){
          setBinds(el,k,e.value,e);
        });
      }
    });

    el.addAttrListener('setAttribute',function(e){
      var attr = e.arguments[0],
          value = e.arguments[1];
      setBinds(el,attr,value,e);
    });

    return CreateBinds;
  }

  return CreateBinds;
});
