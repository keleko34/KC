/*********************************
 *  edit_login
 *  Created by Keleko34
 *  The main login for the cms editor
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./edit_login.bp', './edit_login.vm', 'text!./edit_login.html', 'text!./edit_login.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */

    /* COMPONENT BUILD SECTION */
    /* END COMPONENT BUILD SECTION */

    /* BUILD SECTION */
    /* END BUILD SECTION */

    function Createedit_login(){

      /**** PRIVATE ****/
      var _isRemembered = false,
          _isWarning = false,
          _warningType = 'error',
          _warningTypeEnum = ['error','info','success'],
          _fetched = false,
          _disabled = false;

      /**** CONSTRUCTOR ****/

      /* modulizes this module to keep in sync with viewmodel when constructor is called, creates .add and .viewmodel properties */
      var edit_login = kc.Modularize(function(){
        if(!_fetched){
          _fetched = true;
          kc.CMS.addLoadListener(function(percent){
            if(percent === 100){
              document.body.removeChild(edit_login.node);
            }
          });
          var ls = localStorage.getItem('cms_l');
          if(ls){
            ls = JSON.parse(ls);
            _isRemembered = ls.r;
            edit_login.user(ls.u);
            edit_login.pass(ls.p);
            kc.CMS.settings.userType = ls.t;
            return;
          }
        }

        edit_login.viewmodel.rememberText(_isRemembered);
        edit_login.viewmodel.rememberColor(_isRemembered);
        edit_login.viewmodel.warning(_isWarning);

        edit_login.viewmodel.mainclass("edit_login--Warning_"+_warningType);
      });

      edit_login.submit = function(vm,e){
        if(!_disabled){
          e = (e === undefined ? vm : e);
          if(e.type === 'keyup' && (e.which || e.keyCode) === 13){
            edit_login.send();
          }
          else if(e.type !== 'keyup'){
            edit_login.send();
          }
        }
      }

      edit_login.send = function(){
        if(edit_login.user().length === 0 || edit_login.pass().length === 0){
          _isWarning = true;
          _warningType = 'error';
          edit_login.message("A field is missing, please fill in both fields").call();
          return;
        }
        function response(data){
          data = JSON.parse(data);
          if(data.err){
            _isWarning = true;
            _warningType = 'error';
            edit_login.message(data.message).call();
          }
          else if(data.success){
            _isWarning = true;
            _warningType = 'success';
            kc.CMS.settings.userType = data.type;
            if(_isRemembered){
              localStorage.setItem('cms_l',JSON.stringify({r:true,u:edit_login.user(),p:edit_login.pass(),t:data.type}));
            }
            _disabled = true;
            kc.CMS.isAuth = true;
            kc.CMS.load();
            edit_login.message("Successfully logged in, loading interface").call();
          }
        }

        if(io && io.socket && io.socket.post){
          io.socket.post(edit_login.url('cms_login'),{},response);
        }
        else{
          var io = new XMLHttpRequest();
          io.onreadystatechange = function(e){
            if(io.readyState === 4 && io.status === 200){
              response(io.responseText);
            }
          }
          io.open("POST", edit_login.url('cms_login'), true);
          io.send();
        }
      }

      edit_login.remember = function(){
        _isRemembered = !_isRemembered;
        if(!_isRemembered){
          localStorage.removeItem('cms_l');
        }
        edit_login.call();
      }

      edit_login.closeWarning = function(){
        _isWarning = false;
        edit_login.call();
      }

      edit_login.add({
        name:'onclick',
        type:'function',
        value:edit_login.submit
      })
      .add({
        name:'onkeyup',
        type:'function',
        value:edit_login.submit
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
        value:edit_login.remember
      })
      .add({
        name:'warningclose',
        type:'function',
        value:edit_login.closeWarning
      })

      edit_login.url = function(url){
        return '/'+url+'/?'+location.search.replace('?','')+'&user='+edit_login.user()+'&pass='+edit_login.pass();
      }

      edit_login.warningType = function(v){
        if(v === undefined){
          return _warningType;
        }
        _warningType = (_warningTypeEnum.indexOf(v) > -1 ? v : _warningType);
        return edit_login;
      }

      return edit_login;
	}
    blueprint.register_edit_login(Createedit_login,viewmodel,template,css);
	return Createedit_login;
});
