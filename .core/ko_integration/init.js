define(['./component'],function(ComponentOverride){
  function CreateIntegration(){

    function Integration(){

      ComponentOverride.overwriteBindHandler('html','update',function(e){
        while(!(e.target instanceof HTMLUnknownElement) && e.target !== null){
          e.target = e.target.parentElement;
        }
        if(e.target && e.target.ko_override.postcheck){
          ComponentOverride.parseNodeChildren(e.type,e.target);
        }
      }).call();


    }



    return Integration;
  }
  return CreateIntegration;
});
