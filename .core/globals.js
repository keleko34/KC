var ko,
    kb,
    modularize;

var isArray = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() === Array.toString());
}

var isObject = function(v){
  return (typeof v === 'object' && !!v && v.constructor.toString() !== Array.toString());
}

var parseQuery = function(qstr){
  var query = {},
      a = qstr.substr(1).split('&');

  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

Object.defineProperty(window,'cls',{
  get:function(){
    clear();
  }
})
