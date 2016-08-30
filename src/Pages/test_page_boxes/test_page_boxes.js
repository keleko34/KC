/*********************************
 *  test_page_boxes
 *  Created by Keleko34
 *  to test box grid styles
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_page_boxes.bp', './test_page_boxes.vm', 'text!./test_page_boxes.html', 'text!./test_page_boxes.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Createtest_page_boxes(){

      /**** PRIVATE ****/

      /* example: private for functional property
       *   var _example = '';
       */

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var test_page_boxes = kc.Modularize(function(){
        /* 'test_page_boxes.viewmodel' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel
         */

        /**** VIEWMODEL UPDATES */

        /* ex: updates the class attr with a changed state
         *
         *   test_page_boxes.viewmodel.mainclass('test_page_boxes' + (_example ? ' test_page_boxes--'+_example : ''));
         */
      });

      /**** PUBLIC METHODS ****/

      /* ex: simplified type checked functional property
       *
       *   test_page_boxes.add({
       *      name:<name of property>,
       *      type:<(number|string|boolean|function|object|array|instance|enum)>,
       *      value:<value>, *optional default: 'undefined'
       *      preprocess:<function, ran on update and must return value>, *optional
       *      checkAgainst:<(string/number enum array|class instance)>, *enum and instance only
       *      isMethod:<Boolean, if type function this tells if prop is non bindable but simple method> *function type only default: false
       *    })
       */

      /* ex: functional property, returns value if nothing, sets if value is string
       *
       *   test_page_boxes.example = function(v){
       *     if(v === undefined){
       *        return _example;
       *     }
       *     _example = (typeof v === 'string' ? v : _example);
       *     return test_page_boxes;
       *   }
      */

      return test_page_boxes;
	}
    blueprint.register_test_page_boxes(Createtest_page_boxes,viewmodel,template,css);
	return Createtest_page_boxes;
});
