/*********************************
 *  CMS_Global_Settings
 *  Created by Keleko34
 *  The global settings for the cms
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_Global_Settings.bp', './CMS_Global_Settings.vm', 'text!./CMS_Global_Settings.html', 'text!./CMS_Global_Settings.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_Global_Settings(){

      var vm = {},
          modularizer = CreateModularizer();
      /* Add Private _variables here */

      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function CMS_Global_Settings(){
        modularizer(CMS_Global_Settings);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('CMS_Global_Settings' + (_example ? ' CMS_Global_Settings--'+_example : ''));
        */
        return CMS_Global_Settings;
      }

      CMS_Global_Settings.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return CMS_Global_Settings;
      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   CMS_Global_Settings.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return CMS_Global_Settings;
         *   }
        */

      return CMS_Global_Settings;
	}
    blueprint.register_CMS_Global_Settings(CreateCMS_Global_Settings,viewmodel,template,css);
	return CreateCMS_Global_Settings;
});
