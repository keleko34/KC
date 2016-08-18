/*********************************
 *  Grid
 *  Created by Keleko34
 *  A flexible grid box
 ********************************/

define(['./Grid.bp', './Grid.vm', 'text!./Grid.html', 'text!./Grid.css'],function(blueprint, viewmodel, template, css){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

    function CreateGrid(){

      /**** PRIVATE ****/

      var _winSizeX = 0,
          _winSizeY = window.innerHeight,
          _initial = false;

      /**** CONSTRUCTOR ****/

      var Grid = kc.Modularize(function(){
        if(!_initial){
          _initial = true;
          resize();
        }
      });

      /**** PUBLIC METHODS ****/

      Grid.add({
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
        value:275
      })
      .add({
        type:'number',
        name:'minHeight',
        value:200
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
        if(Grid.width() === window.innerWidth){
          var parent = Grid.viewmodel.Node.parentElement,
              index = getIndex(Grid.viewmodel.Node),
              siblings = Array.prototype.slice.call(parent.children).filter(function(k){
                return (k.KViewModel && k.KViewModel.methods.col && k.KViewModel.methods.col() === Grid.col());
              });
          if(siblings.length > 0){
            _winSizeX = window.innerWidth;
            Grid.width(window.innerWidth/(siblings.length+1)).call();
          }
          else{
            var w = Grid.width(),
              dif = (_winSizeX - window.innerWidth);
              _winSizeX = window.innerWidth;
              Grid.width((w-dif)).call();
          }
        }
        else{
          var w = Grid.width(),
              dif = (_winSizeX - window.innerWidth),
              newW = (w-dif);
          if(newW <= Grid.minWidth()){
            newW = Grid.minWidth();
          }
          else if(newW >= Grid.minWidth() && document.body.scrollWidth > window.innerWidth){
            newW = newW-(document.body.scrollWidth-window.innerWidth);
          }
          _winSizeX = window.innerWidth;
          Grid.width(newW).call();
        }
      }

      window.addEventListener('resize',resize);

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
