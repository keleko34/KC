/*********************************
 *  CMS_Grid
 *  Created by Keleko34
 *  A grid element with settings
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_Grid.bp', './CMS_Grid.vm', 'text!./CMS_Grid.html', 'text!./CMS_Grid.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_Grid(){

      var CMS_Grid = kc.Modularize(function(){

      });

      CMS_Grid.cms_node = this;

      CMS_Grid.constructor = function(grid){

      }

      CMS_Grid.destructor = function(grid){

      }
      return CMS_Grid;
	}
    blueprint.register_CMS_Grid(CreateCMS_Grid,viewmodel,template,css);
	return CreateCMS_Grid;
});
