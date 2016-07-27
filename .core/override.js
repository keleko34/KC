/* This File is in charge of KO integration, overrides and feature adding */

define(['./autobindings'],function(CreateAutoBinds){
    return function(){

      /* parser for parsing location ?querydata */
      function parseQuery(qstr){
        var query = {},
            a = qstr.substr(1).split('&');

        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
      }

      /* This method takes a series of routes and attempts to require them in, when finished it calls callback */
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

      /* This will take a string template and parse it for new components and then attempt to load them */
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

      /* This simply fetches a page if it doesnt already exists */
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












      function bindingtranslator(t,el,valueAccessor,vm){
        if(t === 'component'){
          el.AutoBinder = CreateAutoBinds();
          el.AutoBinder.attachBinds(el);
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
      ko.attachProp = function(k,value,el,isEvent){
        k = k.toLowerCase();
        if(k !== 'methods' && k !== 'name'){
          var vm = el.KViewModel;
          if(vm[k] === undefined){
            vm[k] = (!isEvent ? ko.observable(value) : (typeof value === 'function' ? value : function(){}));
            (el ? el : document).querySelectorAll("[data-bind*='"+k+"']").forEach(function(n,i){
              ko.cleanNode(n);
              ko.applyBindings(vm,n);
            });
          }

          if(vm.methods && vm.methods[(k.replace('_binding',''))] === undefined){
            var _private = (!isEvent ? vm[k]() : vm[k]);
            vm.methods[(k.replace('_binding',''))] = function(v){
              if(v === undefined){
                return _private;
              }
              var vmVal = (!isEvent ? vm[k]() : vm[k]);
              if(typeof v === typeof vmVal || vmVal === undefined){
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
          else if(vm.methods && vm.methods[(k.replace('_binding',''))] !== undefined){
            vm.methods[(k.replace('_binding',''))]((!isEvent ? vm[k]() : vm[k]));
            if(isEvent){
              vm[k] = vm.methods[(k.replace('_binding',''))]();
            }
            else{
              vm[k](vm.methods[(k.replace('_binding',''))]());
            }
          }
        }
      }

      /* add attachment extender */
      ko.extenders.attach = function(target,attachment){
        var result = ko.pureComputed({
            read: target,
            write: function(newValue) {
                target((attachment && newValue.indexOf(attachment+" ") < 0 ? attachment + " " + newValue : newValue));
            }
        });

        result(target());
        return result;
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
                componentInfo.element.AutoBinder(componentInfo.element);
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
