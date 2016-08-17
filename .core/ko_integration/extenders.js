function integrateExtenders(){
  ko.extenders.attach = function(target, attach){
    return integrateExtenders.compute(target,function(v){
      target((attach && v.indexOf(attach+" ") < 0 ? attach + " " + v : v));
    });
  },
  ko.extenders.px = function(target, isPX){
    return integrateExtenders.compute(target,function(v){
      target((parseInt(v,10)+(isPX ? 'px' : '')));
    });
  }
}

integrateExtenders.compute = function(target,write){
  var pureComp = ko.pureComputed({
      read:target,
      write:write
    });
    pureComp(target());
    return pureComp;
}

define([],function(){return integrateExtenders});
define('integrateExtenders',function(){return integrateExtenders;});
