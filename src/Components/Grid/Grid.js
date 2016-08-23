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

      /* */
      var _initial = false;

      /**** CONSTRUCTOR ****/

      var Grid = kc.Modularize(function(){
        if(!_initial){
          Grid.width(Grid.node.parentElement.clientWidth)
          .height((Grid.height() === 0 ? (Grid.node.parentElement.clientHeight+Grid.offsetY()) : Grid.height()));
          _initial = true;
          resize();
        }

        Grid.viewmodel.mainclass("Grid--"+Grid.align());

        if(Grid.align() === 'center'){
          var parent = Grid.node.parentElement,
              siblings = Array.prototype.slice.call(parent.children).filter(function(k){
                return (k.KC && k.KC.col && k.KC.row() === Grid.row() && !k.KC.clearfloat());
              }),
              widths = siblings.reduce(function(o,k){
                return o+k.KC.width();
              },0);
          if(siblings.length === 1){
            siblings[0].style.marginLeft = '-'+(siblings[0].KC.width()/2)+'px';
          }
          else{
            var margins = ((parent.clientWidth-widths)/2),
                middle = (parent.clientWidth/2);
            loop:for(var x=0;x<siblings.length;x++){
              if(x === 0){
                 siblings[x].style.marginLeft = '-'+(middle-margins)+'px';
              }
              else{
                if(siblings[(x-1)].style.marginLeft){
                  var prevMargin = parseInt(siblings[(x-1)].style.marginLeft,10),
                      prevWidth = siblings[(x-1)].KC.width();
                  if((prevMargin+prevWidth) > 0){
                    siblings[x].style.marginLeft = undefined;
                  }
                  else{
                    siblings[x].style.marginLeft = '-'+(prevMargin+prevWidth)+'px';
                  }
                }
                else{
                  siblings[x].style.marginLeft = undefined;
                }
              }
            }
          }
        }

      });

      /**** PUBLIC METHODS ****/

      Grid.add({
        type:'number',
        name:'col',
        value:0
      })
      .add({
        type:'boolean',
        name:'clearfloat',
        value:false
      })
      .add({
        type:'enum',
        name:'align',
        value:'left',
        checkAgainst:['left','middle','right']
      })
      .add({
        type:'number',
        name:'offsetX',
        value:0
      })
      .add({
        type:'number',
        name:'offsetY',
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
        value:0
      })
      .add({
        type:'number',
        name:'minWidth',
        value:275
      })

      function getIndex(node){
        var i = 0;
        while(node !== null){
          node = node.previousSibling;
          if(node !== null && node.nodeName.toLowerCase() == 'grid'){
            i++
          }
        }
        return i;
      }

      function resize(e){

        var parent = Grid.node.parentElement,
            index = getIndex(Grid.node),
            siblings = Array.prototype.slice.call(parent.children).filter(function(k){
              return (k.KC && k.KC.col && k.KC.row() === Grid.row());
            });


        if(siblings.length > 1){
          /* width checks */
          var colTotals = siblings.length,
              sibs = siblings.filter(function(el,x){
                return (x === 0 || !el.KC.clearfloat());
              }),
              uSibs = siblings.filter(function(el,x){
                return (x !== 0 && el.KC.clearfloat());
              });

          function getWidths(){
            return sibs.reduce(function(o,k){
              return o+k.KC.minWidth();
            },0);
          }

          function loopSiblings(){
            loop:for(var x=0;x<sibs.length;x++){
              if(sibs[x].KC.width() < sibs[x].KC.minWidth()){
                if(sibs[x].KC.width() !== sibs[x].KC.minWidth()) sibs[x].KC.width(sibs[x].KC.minWidth()).call();
                if(sibs[(sibs.length-1)].KC.width() !== parent.clientWidth || !sibs[(sibs.length-1)].KC.clearfloat()){
                  sibs[(sibs.length-1)].KC.width(parent.clientWidth).clearfloat(true).call();
                }
                uSibs.push(sibs[x]);
                sibs = sibs.slice(0,sibs.length-1);
                colTotals = sibs.length;
                setTimeout(function(){
                  loopSiblings();
                },0);
                return;
              }
              else{
                if(sibs[x].KC.width() !== ((parent.clientWidth/colTotals)+sibs[x].KC.offsetX()) || sibs[x].KC.clearfloat()){
                  sibs[x].KC.width(((parent.clientWidth/colTotals)+sibs[x].KC.offsetX())).clearfloat(false).call();
                }
              }
            }

            if(uSibs.length > 0){
              if(parent.clientWidth >= getWidths()+uSibs[(uSibs.length-1)].KC.minWidth()){
                sibs.push(uSibs[(uSibs.length-1)]);
                uSibs = uSibs.slice(0,uSibs.length-1);
                colTotals = sibs.length;
                if(sibs[(sibs.length-1)].KC.width() !== ((parent.clientWidth/colTotals)+sibs[(sibs.length-1)].KC.offsetX()) || sibs[(sibs.length-1)].KC.clearfloat()){
                  sibs[(sibs.length-1)].KC.clearfloat(false).width(((parent.clientWidth/colTotals)+sibs[(sibs.length-1)].KC.offsetX()));
                }
                setTimeout(function(){
                  loopSiblings();
                },0);
                return;
              }

              loop2:for(var x=0;x<uSibs.length;x++){
                if(uSibs[x].KC.width() !== parent.clientWidth) uSibs[x].KC.width(parent.clientWidth).call();
              }
            }
          }

          loopSiblings();

        }
        else{
          Grid.width(parent.clientWidth+Grid.offsetX()).call();
        }

      }

      window.addEventListener('resize',resize);

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
