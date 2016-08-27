var ko,
    kb,
    kc = {};

kc.isArray = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() === Array.toString());
}

kc.isHTMLCollection = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() === HTMLCollection.toString());
}

kc.isObject = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() !== Array.toString());
}

kc.parseQuery = function(qstr){
  var query = {},
      a = qstr.substr(1).split('&');

  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

kc.stringifyQuery = function(qobj){
  var keys = Object.keys(qobj),
      str = "?";
  for(var x=0;x<keys.length;x++){
    str += (x !== 0 ? "&" : "")+keys[x]+"="+qobj[keys[x]];
  }
  return str;
}

kc.getAttributes = function(el){
  return Array.prototype.slice.call(el.attributes)
  .map(function(k){return k.name;})
  .filter(function(k){return (k !== 'data-bind' && k !== 'id' && k !== 'class')});
}

kc.getPercent = function(min,max,curr){
  return parseInt((1.0-(((max-min)-(curr-min))/(max-min)))*100,10);
}

kc.isType = {
  string: function(v,c){
    if(typeof v === 'number') v = v+"";
    return (typeof v === 'string' && (c ? v !== c : true) ? v : undefined);
  },
  number: function(v,c){
    return ((typeof v === 'number' || !isNaN(parseInt(v,10))) && (((c || parseInt(c,10) === 0)) ? parseInt(v,10) !== c : true) ? parseInt(v,10) : undefined);
  },
  boolean: function(v,c){
    if(typeof v === 'string'){
      if(v === 'false'){
        v = false;
      }
      else if(v === 'true'){
        v = true;
      }
    }
    return (typeof v === 'boolean' && (c !== undefined ? v !== c : true) ? !!v : undefined);
  },
  function: function(v,c){
    return (typeof v === 'function' && (c ? v.toString() !== c.toString() : true) ? v : undefined);
  },
  object: function(v,c){
    var r = false;
    try{
      r = (kc.isObject(v) && (c ? JSON.stringify(v) !== JSON.stringify(c) : true));
    }
    catch(e){
      console.warn('Warning circular objects are difficult to keep in sync, try using different methodology old: ',c,' new:',v);
      r = true;
    }
    return (r ? v : undefined);
  },
  array: function(v,c){
    var r = false;
    try{
      r = (kc.isArray(v) && (c ? JSON.stringify(v) !== JSON.stringify(c) : true));
    }
    catch(e){
      console.warn('Warning circular arrays are difficult to keep in sync, try using different methodology old: ',c,' new:',v);
      r = true;
    }
    return (r ? v : undefined);
  },
  instance: function(v,c,i){
    return ((i !== undefined ? (v instanceof i) : (v instanceof c)) ? v : undefined);
  },
  enum: function(v,c,e){
    if(kc.isArray(c) && e === undefined) e = c;
    return ( ((e !== undefined && c !== undefined) ? v !== c : true) && ((kc.isArray(c) && e === undefined) ? c.indexOf(v) > -1 : e.indexOf(v) > -1) ? v : undefined);
  }
}

kc.templates = {};

kc.settings = {};

kc.CMS = {};

kc.cssrules = {};

kc.post = function(url,post,cb){
  var xhtp = new XMLHttpRequest();
  post = (typeof post === 'string' ? ("?"+post.replace("?","")) : (kc.isObject(post) ? kc.stringifyQuery(post) : ""));
  xhtp.onreadystatechange = function(e){
    var state = xhtp.readyState,
        status = xhtp.status;
    if(state === 4 && status === 200){
      cb(null,xhtp.responseText);
    }
    else if(state === 4 && status !== 200){
      cb((status === 404 ? (url+post+" Url not found") : (url+post+" There was a Server Error")));
    }
  }
  xhtp.open("POST",url+post,true);
  xhtp.send();
}

kc.require = function(url,post,cb){
  post = (typeof post === 'string' ? ("?"+post.replace("?","")) : (kc.isObject(post) ? kc.stringifyQuery(post) : ""));
  require([url+post],function(module){
    cb(null,module);
  },function(err){
    cb(err);
  })
}

kc.appendScript = function(url){
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}

kc.parseCSS = function(css){
   return css.split(/(.*?{.*?})/g)
    .filter(function(r){
      return (r.length > 0 && (r !== '\r\n' && r !== '\n'));
    })
    .map(function(r){
      return r.split(/(.*?)({)(.*?)(})/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
    })
    .reduce(function(o,r){
      o[r[0].replace(/\s/g,'')] = (r.length < 4 ? "" : r[2].split(/(.*?:.*?;)/)
      .filter(function(k){
        return (k.length > 0 && (k !== '\r\n' && k !== '\n'));
      })
      .reduce(function(ro,k){
        k = k.substring(2,k.length)
        ro[k.substring(0,k.indexOf(':')).replace(/\s/g,'')] = k.substring((k.indexOf(':')+1),k.indexOf(';'));
        return ro;
      },{}));
      return o;
    },{})
}

kc.runCSSRules = function(element,cssRulesFromParseCSS){

  function runRule(selector,rule,value){
    var els = element.querySelectorAll(selector);
    if(els.length > 0){
      if(kc.cssrules[rule]){
        for(var x=0;x<els.length;x++){
          kc.cssrules[rule].call(els[x],value);
        }
      }
    }
  }

  var selectors = Object.keys(cssRulesFromParseCSS);
  for(var x=0;x<selectors.length;x++){
    var rules = Object.keys(cssRulesFromParseCSS[selectors[x]]);
    for(var i=0;i<rules.length;i++){
      runRule(selectors[x],rules[i],cssRulesFromParseCSS[selectors[x]][rules[i]]);
    }
  }
}

kc.hasScrollBar = function(element){
  return ((element.scrollHeight > element.clientHeight) || (element.scrollHeight > window.innerHeight) || (window.scrollheight > window.innerHeight));
}

/* to easily clear console */
Object.defineProperty(window,'cls',{
  get:function(){
    if(typeof clear === 'function') clear();
  }
});
