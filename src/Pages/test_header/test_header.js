/*********************************
 *  test_header
 *  Created by Keleko34
 *  a test grid header
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_header.bp', './test_header.vm', 'text!./test_header.html', 'text!./test_header.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_header(){
      kc.Modularize(test_header);
      /* Add Private _variables here */

      function test_header(){

        return test_header;
      }

      return test_header;
	}
    blueprint.register_test_header(Createtest_header,viewmodel,template,css);
	return Createtest_header;
});
