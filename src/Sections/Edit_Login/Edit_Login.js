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
      var _isRemembered = false,
          _isWarning = false,
          _warningType = 'error',
          _warningTypeEnum = ['error','info','success'],
          _fetched = false,
          _disabled = false;

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var Edit_Login = kc.Modularize(function(){
        if(!_fetched){
          _fetched = true;
          var ls = localStorage.getItem('cms_l');
          if(ls){
            ls = JSON.parse(ls);
            _isRemembered = ls.r;
            Edit_Login.user(ls.u);
            Edit_Login.pass(ls.p);
            kc.CMS.settings.userType = ls.t;
            Edit_Login.submit({type:'auto'});
            return;
          }
        }

        Edit_Login.viewmodel.rememberText(_isRemembered);
        Edit_Login.viewmodel.rememberColor(_isRemembered);
        Edit_Login.viewmodel.warning(_isWarning);

        Edit_Login.viewmodel.mainclass("Edit_Login--Warning_"+_warningType);
      });

      Edit_Login.submit = function(vm,e){
        if(!_disabled){
          e = (e === undefined ? vm : e);
          if(e.type === 'keyup' && (e.which || e.keyCode) === 13){
            Edit_Login.send();
          }
          else if(e.type !== 'keyup'){
            Edit_Login.send();
          }
        }
      }

      Edit_Login.send = function(){
        if(Edit_Login.user().length === 0 || Edit_Login.pass().length === 0){
          _isWarning = true;
          _warningType = 'error';
          Edit_Login.message("A field is missing, please fill in both fields").call();
          return;
        }
        function response(data){
          data = JSON.parse(data);
          if(data.err){
            _isWarning = true;
            _warningType = 'error';
            Edit_Login.message(data.message).call();
          }
          else if(data.success){
            _isWarning = true;
            _warningType = 'success';
            kc.CMS.settings.userType = data.type;
            if(_isRemembered){
              localStorage.setItem('cms_l',JSON.stringify({r:true,u:Edit_Login.user(),p:Edit_Login.pass(),t:data.type}));
            }
            _disabled = true;
            Edit_Login.message("Successfully logged in, loading interface").call();
            kc.CMS.load();
          }
        }

        if(io && io.socket && io.socket.post){
          io.socket.post(Edit_Login.url('cms_login'),{},response);
        }
        else{
          var io = new XMLHttpRequest();
          io.onreadystatechange = function(e){
            if(io.readyState === 4 && io.status === 200){
              response(io.responseText);
            }
          }
          io.open("POST", Edit_Login.url('cms_login'), true);
          io.send();
        }
      }

      Edit_Login.remember = function(){
        _isRemembered = !_isRemembered;
        if(!_isRemembered){
          localStorage.removeItem('cms_l');
        }
        Edit_Login.call();
      }

      Edit_Login.closeWarning = function(){
        _isWarning = false;
        Edit_Login.call();
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
      .add({
        name:'onremember',
        type:'function',
        value:Edit_Login.remember
      })
      .add({
        name:'warningclose',
        type:'function',
        value:Edit_Login.closeWarning
      })

      Edit_Login.url = function(url){
        return '/'+url+'/?'+location.search.replace('?','')+'&user='+Edit_Login.user()+'&pass='+Edit_Login.pass();
      }

      Edit_Login.warningType = function(v){
        if(v === undefined){
          return _warningType;
        }
        _warningType = (_warningTypeEnum.indexOf(v) > -1 ? v : _warningType);
        return Edit_Login;
      }

      return Edit_Login;
	}
    blueprint.register_Edit_Login(CreateEdit_Login,viewmodel,template,css);
	return CreateEdit_Login;
});
