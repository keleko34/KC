define(['kb'],function(CreateKB){
    /* Initilize KB */
    var kb = CreateKB();
    kb.call();

    return function(){
      function parseQuery(qstr){
        var query = {},
            a = qstr.substr(1).split('&');

        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
      }

      function loadComponent(routes, callback){
        var query = parseQuery(location.search);

        routes.map(function(k,i){
          if(query.env !== undefined){
            k = k+'?env='+query.env;
          }
          if(query.debug !== undefined){
            k = k+(query.env !== undefined ? '&' : '?')+'debug='+query.debug;
          }
          return k;
        })
        .forEach(function(k,i){
            if(!require.defined(k)){
                require([k],function(vm){
                  routes.splice(routes.indexOf(k),1);
                  if(routes.length < 1){
                    callback();
                  }
                }, function(err){
                  console.log(k,' does not exist');
                })
            }
        });
      }

      function parseComponents(template,callback){
        var reg = /(<\/(.*?)>)/g,
            matched = (template.match(reg) ? template.match(reg) : []).map(function(k,i){
              return k.substring(2,k.length-1);
            }),
            routes = [];

        for(var x=0;x<matched.length;x++){
          if(document.createElement(matched[x]) instanceof HTMLUnknownElement){
            if(!ko.components.isRegistered(matched[x])){
              routes.push('/require/'+matched[x]);
            }
          }
        }
        if(routes.length > 0){
          loadComponent(routes,callback);
        }
        else{
          callback();
        }
      }

      function getPage(name,callback){
        var routes = [];
        if(!ko.components.isRegistered(name)){
          routes.push('/require/'+name);
        }

        if(routes.length > 0){
          loadComponent(routes,callback);
        }
        else{
          callback();
        }
      }

      function attachbinding(type,el,attr,vm){
        switch(type){
          case 'text':
            if(el[attr].length > 0){
              el.kobindings[attr.toLowerCase()+"binding"] = el[attr];
            }
            /*
            el.addAttrListener(attr,function(e){
              if(el.KViewModel && !el.KViewModel[attr.toLowerCase()+"binding"]){
                el.KViewModel[attr.toLowerCase()+"binding"] = ko.observable(e.value);
                ko.attachProp(attr.toLowerCase()+"binding",el.KViewModel,el);
                e.preventDefault();
              }
            })*/
          break;
          case 'event':
            if(el[attr] || el.getAttribute(attr)){
              el.kobindings[attr.toLowerCase()+"binding"] = (el[attr] || eval('(function(e){'+el.getAttribute(attr)+'})'));
              el[attr] = undefined;
              el.removeAttribute(attr);
            }
            el.addAttrListener(attr,function(e){
              if(el.KViewModel && !el.KViewModel[attr.toLowerCase()+"binding"]){
                el.KViewModel[attr.toLowerCase()+"binding"] = e.value;
                ko.attachProp(attr.toLowerCase()+"binding",el.KViewModel,el,true);
                el.KViewModel.methods();
                e.preventDefault();
              }
            })
          break;
          case 'attr':
            if(el.getAttribute(attr)){
              el.kobindings[attr.toLowerCase()+"binding"] = el.getAttribute(attr);
            }
          break;
        }
      }

      /* So we can keep the text content inside */

      function bindingtranslator(t,el,valueAccessor,vm){
        if(t === 'component'){
          /* Text Bindings */
          attachbinding('text',el,'textContent',vm);
          attachbinding('text',el,'innerHTML',vm);

          /* Event Bindings */
          var events = ['onclick','onmouseover','onmouseout','onmousedown','onmouseup','oninput','onchange','onkeydown','onkeyup','onfocus','onblur'];
          events.forEach(function(e,i){
            attachbinding('event',el,e,vm);
          });

          el.addAttrListener('setAttribute',function(e){
              if(events.indexOf(e.arguments[0]) > -1){
                if(el.KViewModel && !el.KViewModel[e.arguments[0]+"binding"]){
                  el.KViewModel[e.arguments[0].toLowerCase()+"binding"] = eval('(function(e){'+e.arguments[1]+'})');
                  ko.attachProp(e.arguments[0].toLowerCase()+"binding",el.KViewModel,el,true);
                  el.KViewModel.methods();
                  e.preventDefault();
                }
              }
            })

          /* Src Bindings */
          var attributes = ['src','src_hover','src_active','src_toggled','type','toggled','link','disabled'];
          attributes.forEach(function(a,i){
            attachbinding('attr',el,a,vm);
          });

          el.addAttrListener('setAttribute',function(e){
            if(attributes.indexOf(e.arguments[0]) > -1){
              if(el.KViewModel && !el.KViewModel[e.arguments[0]+"binding"]){
                el.KViewModel[e.arguments[0].toLowerCase()+"binding"] = ko.observable(e.arguments[1]);
                ko.attachProp(e.arguments[0].toLowerCase()+"binding",el.KViewModel,el);
                el.KViewModel.methods();
                e.preventDefault();
              }
            }
          })


        }
        else if(t === 'attr'){
          var attrs = valueAccessor();
          Object.keys(attrs).forEach(function(k,i){
            if(el.getAttribute(k)){
              valueAccessor()[k].extend({attach:el.getAttribute(k)});
            }
          });
        }
      }

      Object.keys(ko.bindingHandlers).forEach(function(k,i){
        ko.bindingHandlers[k]._preprocess = ko.bindingHandlers[k].preprocess;
        ko.bindingHandlers[k].preprocess = function(val,name,km){
          if(ko.bindingHandlers[k]._preprocess !== undefined){
            return ko.bindingHandlers[k]._preprocess.apply(this,arguments);
          }
          else{
            return val;
          }
        }

        ko.bindingHandlers[k]._init = ko.bindingHandlers[k].init;
        ko.bindingHandlers[k].init = function(el,valueAccessor,model,vm){

          if(el.kobindings === undefined){
            el.kobindings = {};
            el.bindnames = [];
          }
          bindingtranslator(k,el,valueAccessor,vm);
          if(ko.bindingHandlers[k]._init !== undefined){
            ko.bindingHandlers[k]._init.apply(this,arguments);
          }
        }
      });

      /* used for attaching props dynamicly to viewmodels and components */
      ko.attachProp = function(k,vm,el,isEvent){
        if(k !== 'methods' && k !== 'name'){
          if(vm[k] === undefined){
            vm[k] = (!isEvent ? ko.observable() : function(){});
            if(!el || (el && el.KViewModel !== undefined)){
              (el ? el : document).querySelectorAll("[data-bind*='"+k+"']").forEach(function(n,i){
                ko.cleanNode(n);
                ko.applyBindings(vm,n);
              });
            }

          }
          if(vm.methods[k] === undefined && typeof vm[k] === 'function'){
            var _private = (!isEvent ? vm[k]() : vm[k]);
            vm.methods[k] = function(v){
              if(v === undefined){
                return _private;
              }
              if(typeof v === typeof (!isEvent ? vm[k]() : vm[k]) || (!isEvent ? vm[k]() : vm[k]) === undefined){
                _private = v;
                if(!isEvent){
                  vm[k](v);
                }
                else{
                  vm[k] = v;
                }
              }
              return vm.methods;
            }
          }
          else if(typeof vm[k] === 'function'){
            vm.methods[k]((!isEvent ? vm[k]() : vm[k]));
          }
        }
      }

      /* add attachment extender */
      ko.extenders.attach = function(target,attachment){
        target(attachment+" "+target());
        return target;
      }

      /* This overrides the components loader so that an element is attached the viewmodel and the viewmodel is atached to the element */
      ko.components.loaders.unshift({
        getConfig: function(name, callback) {
          if(!ko.components.isRegistered(name)){
              getPage(name,function(){
                ko.components.defaultLoader.getConfig(name, callback);
              })
          }
          else{
            ko.components.defaultLoader.getConfig(name, callback);
          }
        },
        loadViewModel: function (name, viewModelConfig, callback) {
          if (typeof viewModelConfig === "function") {
            var viewModelConstructor = {
              createViewModel: function (params, componentInfo) {
                componentInfo.element.KViewModel = new viewModelConfig(params, componentInfo.element);
                if(componentInfo.element.kobindings){
                  Object.keys(componentInfo.element.kobindings).forEach(function(k,i){
                    if(!componentInfo.element.KViewModel[k]){
                      componentInfo.element.KViewModel[k] = (typeof componentInfo.element.kobindings[k] === 'function' ? componentInfo.element.kobindings[k] : ko.observable(componentInfo.element.kobindings[k]));
                      ko.attachProp(k,componentInfo.element.KViewModel,componentInfo.element);
                    }
                    else{
                      if(typeof componentInfo.element.kobindings[k] === 'function'){
                        componentInfo.element.KViewModel[k] = componentInfo.element.kobindings[k];
                      }
                      else{
                        componentInfo.element.KViewModel[k](componentInfo.element.kobindings[k]);
                      }

                      componentInfo.element.KViewModel.methods();
                    }

                  });
                }
                return componentInfo.element.KViewModel;
              }
            };
            ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
          } else {
            callback(null);
          }
        },
        loadTemplate: function (name, templateConfig, callback) {
          if (typeof templateConfig === 'string'){
            parseComponents(templateConfig,function(){
              ko.components.defaultLoader.loadTemplate(name, templateConfig, callback);
            });
          } else if (templateConfig.fromUrl) {
            require(['text!'+templateConfig.fromUrl],function(cp){
              ko.components.defaultLoader.loadTemplate(name, cp, callback);
            });
          } else {
            callback(null);
          }
        }
      });

    }
})
