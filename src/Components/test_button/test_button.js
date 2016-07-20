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

      var vm = {},
          modularizer = CreateModularizer();
      /* Add Private _variables here */
      var _typeEnum = ['click','toggle','text'];

      function test_button(){
        modularizer(test_button);

        vm.mainclass((test_button.disabled() ? ' test_button--disabled' : '')
        + (' test_button--'+(test_button.type()))
        + (test_button.type() === 'toggle' ? (test_button.toggled() ? ' test_button--toggled' : '') : ''));

        return test_button;
      }

      test_button.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return test_button;
      }

      modularizer.add({
        type:'function',
        name:'onclick',
        value:function(){},
        preprocess:function(v){
          return function(e){
            if(!test_button.disabled()){
              v.call(this,e);
            }
            if(test_button.link().length > 0){
              location.href = '#'+test_button.link();
            }
          }
        }
      })
      .add({
        type:'boolean',
        name:'disabled',
        value:false
      })
      .add({
        type:'boolean',
        name:'toggled',
        value:false
      })
      .add({
        name:'link',
        preprocess:function(v){
          return v.replace(/(#)/g,'');
        }
      })
      .add({
        name:'innerhtml'
      })
      .add({
        type:'enum',
        name:'type',
        checkAgainst:_typeEnum
      })

      /* add methods for updating and type checking viewmodel properties */

      return test_button;
	}
    blueprint.register_test_button(Createtest_button,viewmodel,template);
	return Createtest_button;
});
