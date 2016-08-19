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

  ko.extenders.translateBool = function(target,enu){
    return integrateExtenders.compute(target,function(v){
      target((typeof v !== 'string' ? (v ? enu[0] : enu[1]) : v));
    });
  }

  ko.extenders.translate = function(target,ts){
    return integrateExtenders.compute(target,function(v){
      if(ts[v]){
        target(ts[v]);
      }
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
