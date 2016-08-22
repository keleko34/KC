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
    return (typeof v === 'string' && (c ? v !== c : true) ? v : undefined);
  },
  number: function(v,c){
    return ((typeof v === 'number' || !isNaN(parseInt(v,10))) && (((c || parseInt(c,10) === 0)) ? parseInt(v,10) !== c : true) ? parseInt(v,10) : undefined);
  },
  boolean: function(v,c){
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

kc.appendScript = function(url){
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}

/* to easily clear console */
Object.defineProperty(window,'cls',{
  get:function(){
    if(typeof clear === 'function') clear();
  }
});
