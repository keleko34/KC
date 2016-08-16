/*********************************
 *  CMS_ComponentsList
 *  Created by Keleko34
 *  Holds a list of all avaliable components to use in the cms
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_ComponentsList.bp', './CMS_ComponentsList.vm', 'text!./CMS_ComponentsList.html', 'text!./CMS_ComponentsList.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_ComponentsList(){

      var vm = {},
          modularizer = kc.CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function CMS_ComponentsList(){
        modularizer(CMS_ComponentsList);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('CMS_ComponentsList' + (_example ? ' CMS_ComponentsList--'+_example : ''));
        */
        return CMS_ComponentsList;
      }

      CMS_ComponentsList.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return CMS_ComponentsList;
      }

      CMS_Grid.modularizer = function(){
        return modularizer;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   CMS_ComponentsList.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return CMS_ComponentsList;
         *   }
        */

      return CMS_ComponentsList;
	}
    blueprint.register_CMS_ComponentsList(CreateCMS_ComponentsList,viewmodel,template,css);
	return CreateCMS_ComponentsList;
});
