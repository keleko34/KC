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

      var CMS_Global_Settings = kc.Modularize(function(){

      });

      return CMS_Global_Settings;
	}
    blueprint.register_CMS_Global_Settings(CreateCMS_Global_Settings,viewmodel,template,css);
	return CreateCMS_Global_Settings;
});
