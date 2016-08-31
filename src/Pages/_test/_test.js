/*********************************
 *  _test
 *  Created by keleko34
 *  Test page for components and sections
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./_test.bp', './_test.vm', 'text!./_test.html', 'text!./_test.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */

    /* COMPONENT BUILD SECTION */
    /* END COMPONENT BUILD SECTION */

    /* SECTION BUILD SECTION */
    /* END SECTION BUILD SECTION */

    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Create_test(){
      /* Add Private _variables here */

      var _test = kc.Modularize(function(){

        /* Update viewmodel properties here */
        _test.node.querySelector('._test__btnfirst').onclick = function(e){
          console.log('first!');
        }
        _test.node.querySelector('._test__btnsecond').onclick = function(e){
          console.log('second!');
        }

      });

      return _test;
	}
    blueprint.register__test(Create_test,viewmodel,template,css);
	return Create_test;
});
