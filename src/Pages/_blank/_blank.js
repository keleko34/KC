/*********************************
 *  _blank
 *  Created by Keleko34
 *  blank templated page
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./_blank.bp', './_blank.vm', 'text!./_blank.html', 'text!./_blank.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Create_blank(){

      var _blank = kc.Modularize(function(){

      });

      return _blank;
	}
    blueprint.register__blank(Create_blank,viewmodel,template,css);
	return Create_blank;
});
