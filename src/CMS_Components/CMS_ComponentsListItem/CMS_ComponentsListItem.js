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
      kc.Modularize(CMS_ComponentsListItem);

      function CMS_ComponentsListItem(){

        return CMS_ComponentsListItem;
      }

      return CMS_ComponentsListItem;
	}
    blueprint.register_CMS_ComponentsListItem(CreateCMS_ComponentsListItem,viewmodel,template,css);
	return CreateCMS_ComponentsListItem;
});
