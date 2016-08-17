define(['./modularizer','./component','./binding'],function(CreateModularizer,ComponentOverride,BindingOverride){
  function CreateIntegration(){

    function Integration(){

      ComponentOverride.overwriteGetConfig(function(name,cb){
        /* Here we auto load the component if it doesnt alredy exist */
        ComponentOverride.loadComponent(name,cb);
      })
      .overwriteLoadTemplate(function(name,template,cb){
        /* when loading a component we parse its html to load any sub child components as well */
        ComponentOverride.parseNodeTemplate('load',template,cb);
      })
      .overwriteLoadViewModel(function(){

        /* Here we can control style reading for methods etc. */
        var css = e.target.querySelector('style').textContent,
            rules = ComponentOverride.parseCss(css,function(e){
          /* iterator for each rule, decipher custom css styles */

        });



      })
      .overwriteBindHandler('component','init',function(e){
        /* Set bind rules */
        BindingOverride(e.target);
      })
      .overwriteBindHandler('html','update',function(e){
        /* When an html bind updates it checks to make sure no new components need initialized */
        e.target = ComponentOverride.getNearestComponent(e.target);
        if(e.target.ko_override && e.target.ko_override.postcheck){
          ComponentOverride.parseNodeChildren(e.type,e.target);
        }
      }).call();


    }



    return Integration;
  }
  return CreateIntegration;
});
