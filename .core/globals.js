var ko,
    kb,
    kc = {};

kc.isArray = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() === Array.toString());
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

/* to easily clear console */
Object.defineProperty(window,'cls',{
  get:function(){
    if(typeof clear === 'function') clear();
  }
})
