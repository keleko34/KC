define([],function(){
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

      /* So we can keep the text content inside */

      function bindingtranslator(t,el){
        if(t === 'component'){
          /* Text Bindings */
          if(el.textContent.length > 0) el.kobindings.textbinding = el.textContent;
          if(el.innerHTML.length > 0) el.kobindings.htmlbinding = el.innerHTML;

          /* Event Bindings */
          if(el.onclick || el.getAttribute('onclick')) el.kobindings.onclickbinding = (el.onclick || eval('(function(e){'+el.getAttribute('onclick')+'})'));
          if(el.onmouseover  || el.getAttribute('onmouseover')) el.kobindings.onmouseoverbinding = (el.onmouseover || eval('(function(e){'+el.getAttribute('onmouseover')+'})'));
          if(el.onmouseout  || el.getAttribute('onmouseout')) el.kobindings.onmouseoutbinding = (el.onmouseout  || eval('(function(e){'+el.getAttribute('onmouseout')+'})'));
          if(el.onmousedown  || el.getAttribute('onmousedown')) el.kobindings.onmousedownbinding = (el.onmousedown  || eval('(function(e){'+el.getAttribute('onmousedown')+'})'));
          if(el.onmouseup  || el.getAttribute('onmouseup')) el.kobindings.onmouseupbinding = (el.onmouseup || eval('(function(e){'+el.getAttribute('onmouseup')+'})'));
          if(el.oninput  || el.getAttribute('oninput')) el.kobindings.oninputbinding = (el.oninput || eval('(function(e){'+el.getAttribute('oninput')+'})'));
          if(el.onchange  || el.getAttribute('onchange')) el.kobindings.onchangebinding = (el.onchange || eval('(function(e){'+el.getAttribute('onchange')+'})'));
          if(el.onkeydown  || el.getAttribute('onkeydown')) el.kobindings.onkeydownbinding = (el.onkeydown  || eval('(function(e){'+el.getAttribute('onkeydown')+'})'));
          if(el.onkeyup  || el.getAttribute('onkeyup')) el.kobindings.onkeyupbinding = (el.onkeyup || eval('(function(e){'+el.getAttribute('onkeyup')+'})'));
          if(el.onfocus  || el.getAttribute('onfocus')) el.kobindings.onfocusbinding = (el.onfocus || eval('(function(e){'+el.getAttribute('onfocus')+'})'));
          if(el.onblur  || el.getAttribute('onblur')) el.kobindings.onblurbinding = (el.onblur || eval('(function(e){'+el.getAttribute('onblur')+'})'));

          /* Src Bindings */
          if(el.getAttribute('src')) el.kobindings.srcbinding = el.getAttribute('src');
          if(el.getAttribute('src_hover')) el.kobindings.src_hoverbinding = el.getAttribute('src_hover');
          if(el.getAttribute('src_active')) el.kobindings.src_activebinding = el.getAttribute('src_active');
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
          bindingtranslator(k,el);
          if(ko.bindingHandlers[k]._init !== undefined){
            ko.bindingHandlers[k]._init.apply(this,arguments);
          }
        }
      });

      /* used for attaching props dynamicly to viewmodels and components */
      ko.attachProp = function(k,vm,el){
        if(k !== 'methods' && k !== 'name'){
          if(vm[k] === undefined){
            vm[k] = ko.observable();
            if(!el || (el && el.KViewModel !== undefined)){
              (el ? el : document).querySelectorAll("[data-bind*='"+k+"']").forEach(function(n,i){
                ko.cleanNode(n);
                ko.applyBindings(vm,n);
              });
            }

          }
          if(vm.methods[k] === undefined && typeof vm[k] === 'function'){
            var _private = vm[k]();
            vm.methods[k] = function(v){
              if(v === undefined){
                return _private;
              }
              if(typeof v === typeof vm[k]() || vm[k]() === undefined){
                _private = v;
                vm[k](v);
              }
              return vm.methods;
            }
          }
          else if(typeof vm[k] === 'function'){
            vm.methods[k](vm[k]());
          }
        }
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
                    componentInfo.element.KViewModel[k] = ko.observable(componentInfo.element.kobindings[k]);
                    ko.attachProp(k,componentInfo.element.KViewModel,componentInfo.element);
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
