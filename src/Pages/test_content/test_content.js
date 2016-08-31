/*********************************
 *  test_content
 *  Created by Keleko34
 *  test grid for main content
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_content.bp', './test_content.vm', 'text!./test_content.html', 'text!./test_content.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */

    /* COMPONENT BUILD SECTION */
    /* END COMPONENT BUILD SECTION */

    /* SECTION BUILD SECTION */
    /* END SECTION BUILD SECTION */

    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_content(){
      /* Add Private _variables here */

      var test_content = kc.Modularize(function(){



      });

      return test_content;
	}
    blueprint.register_test_content(Createtest_content,viewmodel,template,css);
	return Createtest_content;
});
