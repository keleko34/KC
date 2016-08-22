/*********************************
 *  CMS_test_button
 *  Created by Keleko34
 *  cms for test_button
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_test_button.bp', './CMS_test_button.vm', 'text!./CMS_test_button.html', 'text!./CMS_test_button.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_test_button(){

      /**** PRIVATE ****/

      /* example: private for functional property
       *   var _example = '';
       */

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var CMS_test_button = kc.Modularize(function(){
        /* 'CMS_test_button.viewmodel' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel
         */

        /**** VIEWMODEL UPDATES */

        /* ex: updates the class attr with a changed state
         *
         *   CMS_test_button.viewmodel.mainclass('CMS_test_button' + (_example ? ' CMS_test_button--'+_example : ''));
         */
      });

      /**** PUBLIC METHODS ****/

      /* ex: simplified type checked functional property
       *
       *   CMS_test_button.add({
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
       *   CMS_test_button.example = function(v){
       *     if(v === undefined){
       *        return _example;
       *     }
       *     _example = (typeof v === 'string' ? v : _example);
       *     return CMS_test_button;
       *   }
      */

      return CMS_test_button;
	}
    blueprint.register_CMS_test_button(CreateCMS_test_button,viewmodel,template,css);
	return CreateCMS_test_button;
});
