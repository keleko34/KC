/*********************************
 *  $Name
 *  Created by $Author
 *  $Description
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./$Name.bp', './$Name.vm', 'text!./$Name.html', 'text!./$Name.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */

    /* COMPONENT BUILD SECTION */
    /* END COMPONENT BUILD SECTION */

    /* SECTION BUILD SECTION */
    /* END SECTION BUILD SECTION */

    /* BUILD SECTION */
    /* END BUILD SECTION */

	function Create$Name(){

      /**** PRIVATE ****/

      /* example: private for functional property
       *   var _example = '';
       */

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var $Name = kc.Modularize(function(){
        /* '$Name.viewmodel' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel
         */

        /**** VIEWMODEL UPDATES */

        /* ex: updates the class attr with a changed state
         *
         *   $Name.viewmodel.mainclass('$Name' + (_example ? ' $Name--'+_example : ''));
         */
      });

      /**** PUBLIC METHODS ****/

      /* ex: simplified type checked functional property
       *
       *   $Name.add({
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
       *   $Name.example = function(v){
       *     if(v === undefined){
       *        return _example;
       *     }
       *     _example = (typeof v === 'string' ? v : _example);
       *     return $Name;
       *   }
      */

      return $Name;
	}
    blueprint.register_$Name(Create$Name,viewmodel,template,css);
	return Create$Name;
});
