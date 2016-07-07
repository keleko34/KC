var routes = {
  Pages:[
    { url: '',    params: { page: 'progressbar' } },
    { url: 'progressbar',    params: { page: 'progressbar' } }
  ]
}

if (typeof define === "function" && define.amd)
{
    define('routes',function(){return routes;});
    define([],function(){return routes;})
}
else if (typeof module === "object" && module.exports)
{
    module.exports = routes;
}
