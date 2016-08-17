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

      var _winSizeX = 0,
          _winSizeY = window.innerHeight,
          _initial = false,
          _remove = function(){
            vm.Node.parentElement.removeChild(vm.Node);
            window.removeEventListener('resize',resize);
          }

      var CMS_Grid = kc.Modularize(function(){
        if(!_initial){
          _initial = true;
          resize();
        }
      })

      CMS_Grid.add({
        type:'number',
        name:'col',
        value:0
      })
      .add({
        type:'number',
        name:'row',
        value:0
      })
      .add({
        type:'number',
        name:'height',
        value:200
      })
      .add({
        type:'number',
        name:'width',
        value:_winSizeX
      })
      .add({
        type:'number',
        name:'minWidth',
        value:300
      })
      .add({
        type:'number',
        name:'minHeight',
        value:200
      })
      .add({
        type:'function',
        name:'remove',
        value:_remove
      })

      function getIndex(node){
        var i = 0;
        while(node !== null){
          node = node.previousSibling;
          if(node !== null && node.nodeName.toLowerCase() == 'cms_grid'){
            i++
          }
        }
        return i;
      }

      function resize(e){
        if(_winSizeX === window.innerWidth) return;
        /* if width is same need to check columns */
        if(CMS_Grid.width() === window.innerWidth){
          var parent = vm.Node.parentElement,
              index = getIndex(vm.Node),
              siblings = Array.prototype.slice.call(parent.children).filter(function(k){
                return (k.KViewModel && k.KViewModel.methods.col && k.KViewModel.methods.col() === CMS_Grid.col());
              });
          if(siblings.length > 0){
            _winSizeX = window.innerWidth;
            CMS_Grid.width(window.innerWidth/(siblings.length+1)).call();
          }
          else{
            var w = CMS_Grid.width(),
              dif = (_winSizeX - window.innerWidth);
              _winSizeX = window.innerWidth;
              CMS_Grid.width((w-dif)).call();
          }
        }
        else{
          var w = CMS_Grid.width(),
              dif = (_winSizeX - window.innerWidth),
              newW = (w-dif);
          if(newW <= CMS_Grid.minWidth()){
            newW = CMS_Grid.minWidth();
          }
          _winSizeX = window.innerWidth;
          CMS_Grid.width(newW).call();
        }
      }

      window.addEventListener('resize',resize);

      return CMS_Grid;
	}
    blueprint.register_CMS_Grid(CreateCMS_Grid,viewmodel,template,css);
	return CreateCMS_Grid;
});
