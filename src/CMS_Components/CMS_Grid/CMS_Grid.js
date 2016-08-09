/*********************************
 *  CMS_Grid
 *  Created by Keleko34
 *  A grid element with settings
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./CMS_Grid.bp', './CMS_Grid.vm', 'text!./CMS_Grid.html', 'text!./CMS_Grid.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateCMS_Grid(){

      var vm = {},
          modularizer = CreateModularizer();
      /* Add Private _variables here */

      var _winSizeX = window.clientWidth,
          _winSizeY = window.clientHeight;

      function CMS_Grid(){
        modularizer(CMS_Grid);
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel and node properties here */

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('CMS_Grid' + (_example ? ' CMS_Grid--'+_example : ''));
        */
        return CMS_Grid;
      }

      CMS_Grid.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return CMS_Grid;
      }

      modularizer.add({
        type:'number',
        name:'col',
        value:0
      })
      .add({
        type:'number',
        name:'row',
        value:0
      })

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   CMS_Grid.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return CMS_Grid;
         *   }
        */

      function getIndex(node){
        var i = 0;
        while((node = node.previousSibling) != null){
          i++;
        }
        return i;
      }

      Grid.resize = function(e){
        var parent = vm.Node.parentElement,
            index = getIndex(vm.Node),
            siblings = Array.prototype.slice(parent.children).filter(function(k){
              return (k.K_ViewModel && k.K_ViewModel.methods.col && k.K_ViewModel.methods.col() === Grid.col());
            });

        console.log(siblings);



      }

      Grid.remove = function(){
        vm.Node.parentElement.removeChild(vm.Node);
        window.removeEventListener('resize',Grid.resize);
      }

      window.addEventListener('resize',Grid.resize);

      return CMS_Grid;
	}
    blueprint.register_CMS_Grid(CreateCMS_Grid,viewmodel,template,css);
	return CreateCMS_Grid;
});
