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

      Edit_Login.submit = function(vm,e){
        e = (e === undefined ? vm : e);
        if(type === 'keyup' && (e.which || e.keyCode) === 13){

        }
        else{

        }
      }

      Edit_Login.send = function(){

        function response(data){
          if(data.err){

          }
          else{

          }
        }

        if(io && io.socket && io.socket.post){
          io.socket.post(Edit_Login.url(),{},response);
        }
        else{

        }
      }

      Edit_Login.add({
        name:'onclick',
        type:'function',
        value:Edit_Login.submit
      })
      .add({
        name:'onkeyup',
        type:'function',
        value:Edit_Login.submit
      })
      .add({
        name:'user',
        type:'string'
      })
      .add({
        name:'pass',
        type:'string'
      })
      .add({
        name:'message',
        type:'string'
      })

      Edit_Login.url = function(){
        return '/cms/?user='+Edit_Login.user()+'&pass='+Edit_Login.pass();
      }

      return Edit_Login;
	}
    blueprint.register_Edit_Login(CreateEdit_Login,viewmodel,template,css);
	return CreateEdit_Login;
});
