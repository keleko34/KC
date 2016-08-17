define(['./modularizer','./component','./binding','./extenders'],function(CreateModularizer, ComponentOverride, BindingOverride, ExtenderOverride){
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
      .overwriteLoadViewModel(function(e){

        e.target.ko_override.setParentBinds(e.view_model,e.target);

        /* Here we can control style reading for methods etc. */
        var css = e.target.querySelector('style');
        if(css){
            /* iterator for each rule, decipher custom css styles */
            css = css.textContent,
            rules = ComponentOverride.parseCSS(css,function(e){

            });
        }

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

      ExtenderOverride.call();

      return Integration;
    }

    return Integration;
  }
  return CreateIntegration;
});
