/*********************************
 *  CMS_Edit_Login
 *  Created by Keleko34
 *  cms for edit login
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_Edit_Login.bp', './CMS_Edit_Login.vm', 'text!./CMS_Edit_Login.html', 'text!./CMS_Edit_Login.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_Edit_Login(){

      /**** PRIVATE ****/

      /* example: private for functional property
       *   var _example = '';
       */

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var CMS_Edit_Login = kc.Modularize(function(){
        /* 'CMS_Edit_Login.viewmodel' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel
         */

        /**** VIEWMODEL UPDATES */

        /* ex: updates the class attr with a changed state
         *
         *   CMS_Edit_Login.viewmodel.mainclass('CMS_Edit_Login' + (_example ? ' CMS_Edit_Login--'+_example : ''));
         */
      });

      /**** PUBLIC METHODS ****/

      /* ex: simplified type checked functional property
       *
       *   CMS_Edit_Login.add({
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
       *   CMS_Edit_Login.example = function(v){
       *     if(v === undefined){
       *        return _example;
       *     }
       *     _example = (typeof v === 'string' ? v : _example);
       *     return CMS_Edit_Login;
       *   }
      */

      return CMS_Edit_Login;
	}
    blueprint.register_CMS_Edit_Login(CreateCMS_Edit_Login,viewmodel,template,css);
	return CreateCMS_Edit_Login;
});
