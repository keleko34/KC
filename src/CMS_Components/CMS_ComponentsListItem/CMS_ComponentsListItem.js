/*********************************
 *  CMS_ComponentsListItem
 *  Created by Keleko34
 *  A Component list item that can be used to create a component on the page
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_ComponentsListItem.bp', './CMS_ComponentsListItem.vm', 'text!./CMS_ComponentsListItem.html', 'text!./CMS_ComponentsListItem.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_ComponentsListItem(){

      var vm = {},
          modularizer = CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function CMS_ComponentsListItem(){
        modularizer(CMS_ComponentsListItem);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('CMS_ComponentsListItem' + (_example ? ' CMS_ComponentsListItem--'+_example : ''));
        */
        return CMS_ComponentsListItem;
      }

      CMS_ComponentsListItem.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return CMS_ComponentsListItem;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   CMS_ComponentsListItem.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return CMS_ComponentsListItem;
         *   }
        */

      return CMS_ComponentsListItem;
	}
    blueprint.register_CMS_ComponentsListItem(CreateCMS_ComponentsListItem,viewmodel,template,css);
	return CreateCMS_ComponentsListItem;
});
