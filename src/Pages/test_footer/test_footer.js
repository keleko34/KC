/*********************************
 *  test_footer
 *  Created by Keleko34
 *  A test grid footer
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_footer.bp', './test_footer.vm', 'text!./test_footer.html', 'text!./test_footer.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_footer(){
      /* Add Private _variables here */

      var test_footer = kc.Modularize(function(){

      });

      return test_footer;
	}
    blueprint.register_test_footer(Createtest_footer,viewmodel,template,css);
	return Createtest_footer;
});
