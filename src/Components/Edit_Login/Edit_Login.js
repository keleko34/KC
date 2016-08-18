/*********************************
 *  Edit_Login
 *  Created by Keleko34
 *  The main login for the cms editor
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./Edit_Login.bp', './Edit_Login.vm', 'text!./Edit_Login.html', 'text!./Edit_Login.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateEdit_Login(){

      /**** PRIVATE ****/

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var Edit_Login = kc.Modularize(function(){

      });

      return Edit_Login;
	}
    blueprint.register_Edit_Login(CreateEdit_Login,viewmodel,template,css);
	return CreateEdit_Login;
});
