define(['kb'],function(CreateKB){
  var kb = CreateKB();
      kb.call();

  var textBindings = ['textContent','innerHTML'],
    eventBindings = function(el){
      return Object.keys(HTMLElement.prototype).filter(function(k){
        return (k.indexOf('on') > -1);
      });
    },
    attrBindings = function(el){
      return Array.prototype.slice.call(el.attributes)
      .map(function(k){return k.name;})
      .filter(function(k){return (k !== 'data-bind')});
    }

  function CreateBinds(){
    var _binds = {};

    /* This method gets called during template construction, after the viewmodel has been created */
    function Binds(el){
        Object.keys(_binds).forEach(function(bind){
          setBinds(el,bind,_binds[bind]);
        });
    }

    function setBinds(el,attr,value,e){
      /* if Element has a viewmodel yet */
      if(el.KViewModel){

        /* If property already exists */
        if(el.KViewModel[attr+"_binding"]){

          /* if property is ko observable */
          if(!ko.isObservable(el.KViewModel[attr+"_binding"])){
            if(el.KViewModel.methods && typeof el.KViewModel.methods[attr] === 'function'){
              el.KViewModel.methods[attr]((typeof value === 'string' ? eval('(function(e){'+value+'})') : value));
              el.KViewModel[attr+"_binding"] = el.KViewModel.methods[attr]();
            }
            else{
              el.KViewModel[attr+"_binding"] = (typeof value === 'string' ? eval('(function(e){'+value+'})') : value);
            }
          }
          else{
            if(el.KViewModel.methods && typeof el.KViewModel.methods[attr] === 'function'){
              el.KViewModel.methods[attr](value);
              el.KViewModel[attr+"_binding"] = el.KViewModel.methods[attr]();
            }
            else{
              el.KViewModel[attr+"_binding"](value);
            }
          }

          /* Set method properties as well */
          el.KViewModel.methods();

          /* Prevent it from being set */
          if(e){
            e.preventDefault();
          }
        }
        else{

          /* check if is event */
          if(attr.indexOf('on') === 0){
            el.KViewModel[attr+"_binding"] = (typeof value === 'string' ? eval('(function(e){'+value+'})') : value);
            ko.attachProp((attr+"_binding"), el.KViewModel[attr+"_binding"], el, true);
          }
          else{
            el.KViewModel[attr+"_binding"] = ko.observable(value);
            ko.attachProp((attr+"_binding"), value, el, false);
          }
          /* Prevent it from being set */
          if(e){
            e.preventDefault();
          }
        }
      }
    }

    /* This method gets called prior to template construction when the component element is being read */
    Binds.attachBinds = function(el){
      textBindings.concat(eventBindings(el)).concat(attrBindings(el)).forEach(function(k,i){
        if(k.indexOf('on') === 0){
          _binds[k.toLowerCase()] = (el[k] || (el.getAttribute(k) ? eval('(function(e){'+el.getAttribute(k)+'})') : undefined));
          el[k] = undefined;
          el.removeAttribute(k);
        }
        else{
          _binds[k.toLowerCase()] = (el[k] || el.getAttribute(k));
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

    return Binds;
  }
  return CreateBinds;
});
