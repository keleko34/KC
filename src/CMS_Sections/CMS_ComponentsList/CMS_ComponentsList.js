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

      var CMS_ComponentsList = kc.Modularize(function(){

      });

      return CMS_ComponentsList;
	}
    blueprint.register_CMS_ComponentsList(CreateCMS_ComponentsList,viewmodel,template,css);
	return CreateCMS_ComponentsList;
});
