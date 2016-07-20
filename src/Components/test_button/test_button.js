/*********************************
 *  test_button
 *  Created by Keleko34
 *  allows user interaction through a click
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./test_button.bp', './test_button.vm', 'text!./test_button.html', 'css!./test_button.css'],function(blueprint, viewmodel, template){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function Createtest_button(){

      var vm = {};
      /* Add Private _variables here */
      var _onClick = function(){},
          _disabled = false,
          _type = 'click',
          _typeEnum = ['click','toggle','text'],
          _toggled = false,
          _link = '',
          _content = '';

      function test_button(){
        /* Update viewmodel properties here */
        if(vm.linkbinding) test_button.link(vm.linkbinding());
        if(vm.onclickbinding) test_button.onClick(vm.onclickbinding);
        if(vm.typebinding) test_button.type(vm.typebinding());
        if(vm.disabledbinding) test_button.disabled(vm.disabledbinding());
        if(vm.toggledbinding) test_button.toggled(vm.toggledbinding());
        if(vm.innerhtmlbinding) test_button.content(vm.innerhtmlbinding());

        vm.mainclass((_disabled ? ' test_button--disabled' : '')
        + (' test_button--'+(_type))
        + (_type === 'toggle' ? (_toggled ? ' test_button--toggled' : '') : ''));

        return test_button;
      }

      test_button.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return test_button;
      }

      test_button.onClick = function(v){
        if(v === undefined){
          return _onClick;
        }
        _onClick = (typeof v === 'function' && v.toString() !== _onClick.toString() ? function(e){
          if(!_disabled){
            v.call(this,e)
          }
          if(_link.length > 0){
            location.href = '#'+_link;
          }
        } : _onClick);
        if(vm.onclickbinding){
          vm.onclickbinding = _onClick;
        }
        return test_button;
      }

      test_button.disabled = function(v){
        if(v === undefined){
          return _disabled;
        }
        _disabled = !!v;
        if(vm.disabledbinding){
          vm.disabledbinding((_disabled ? 'true' : null));
        }
        return test_button;
      }

      test_button.toggled = function(v){
        if(v === undefined){
          return _toggled;
        }
        _toggled = !!v;
        if(vm.toggledbinding){
          vm.toggledbinding((_toggled ? 'true' : null));
        }
        return test_button;
      }

      test_button.link = function(v){
        if(v === undefined){
          return _link;
        }
        _link = (typeof v === 'string' ? v.replace(/(#)/g,'') : _link);
        if(vm.linkbinding){
          vm.linkbinding(_link);
        }
        return test_button;
      }

      test_button.content = function(v){
        if(v === undefined){
          return _content;
        }
        _content = (typeof v === 'string' ? v : _content);
        if(vm.innerhtmlbinding){
          vm.innerhtmlbinding(_content);
        }
        return test_button;
      }

      test_button.type = function(v){
        if(v === undefined){
          return _type;
        }
        _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
        if(vm.typebinding){
          vm.typebinding(_type);
        }
        return test_button;
      }

      test_button.addType = function(v){
        if(typeof v === 'string'){
          _typeEnum.push(v);
        }
        return test_button;
      }

      /* add methods for updating and type checking viewmodel properties */

      return test_button;
	}
    blueprint.register_test_button(Createtest_button,viewmodel,template);
	return Createtest_button;
});
