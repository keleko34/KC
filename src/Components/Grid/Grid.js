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
          Grid.resize();
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
        name:'offsetx',
        value:0
      })
      .add({
        type:'number',
        name:'row',
        value:0
      })
      .add({
        type:'number',
        name:'width',
        value:0
      })
      .add({
        type:'number',
        name:'minwidth',
        value:275
      })
      .add({
        type:'number',
        name:'marginleft',
        value:0
      })
      .add({
        type:'boolean',
        name:'locked',
        value:false
      })

      Grid.resize = function(e){

        function checkAllLoaded(grids){
          return grids.filter(function(x,i){
            return (x !== undefined);
          })
          .filter(function(k,i){
            var found = true;
            loop:for(var x=0;x<k.length;x++){
              if(k[x] === undefined){
                found = false;
                break loop;
              }
            }
            return found;
          });
        }

        function splitGrids(grids){
          var arr = [];
          for(var x=0;x<grids.length;x++){
            if(grids[x].KC){
              if(grids[x].KC.row && grids[x].KC.col){
                if(!arr[grids[x].KC.row()]){
                  arr[grids[x].KC.row()] = [];
                  arr[grids[x].KC.row()][grids[x].KC.col()] = grids[x];
                }
                else{
                  arr[grids[x].KC.row()][grids[x].KC.col()] = grids[x];
                }
              }
            }
          }
          return (arr.length > 0 ? arr : null);
        }

        function checkRecallWidths(grids){
          return grids.filter(function(k,i){
            return ((i === 0 || !k.KC.clearfloat()));
          }).reduce(function(o,k){
            return o+k.KC.minwidth();
          },0);
        }

        function getSoonestClearFloat(grids){
          for(var x=1;x<grids.length;x++){
            if(grids[x] && grids[x].KC.clearfloat()){
              return grids[x];
            }
          }
          return null;
        }

        function getLastNonClearFloat(grids){
          for(var x=1;x<grids.length;x++){
            if(grids[x] && grids[x].KC.clearfloat()){
              return grids[(x-1)];
            }
          }
          return grids[(grids.length-1)];
        }

        function getWidths(grids){
          return grids.filter(function(k,i){
            return ((i === 0 || !k.KC.clearfloat()));
          }).reduce(function(o,k){
            return o+k.KC.width();
          },0);
        }

        function getOffset(grids){
          return grids.reduce(function(o,k){
            return ((k.KC.col() == 0 || !k.KC.clearfloat()) ? o+k.KC.offsetx() : o+0);
          },0);
        }

        function getFullOffset(grid){
          return (grid.KC.offsetx() < 0 ? grid.KC.offsetx() : 0);
        }

        /* Grids control their child grids, if no parent grid exists they also control themselves, ie topmost grid */
        var children = Array.prototype.slice.call(Grid.node.querySelector('.Grid').children).filter(function(k){
              return (k.nodeName.toLowerCase() === 'grid')
            });

        if(Grid.node.parentElement.className.indexOf('Grid') < 0){
          Grid.width(Grid.node.parentElement.clientWidth+Grid.offsetx()).clearfloat(true)._update();
          Grid.viewmodel.mainclass("Grid--left");
        }

        function getColTotals(grids){
          return grids.filter(function(k){
            return (k.KC.col() === 0 || !k.KC.clearfloat());
          }).length
        }

        function resizeGrids(){
         for(var i=0;i<children.length;i++){
           if(children[i].length > 1){
             children[i][0].KC.clearfloat(true)._update();
             console.log(getOffset(children[i]),(children[i][0].KC.width() - getOffset(children[i])),children[i][0].KC.minwidth());
             for(var x=0;x<children[i].length;x++){
                var child = children[i][x];
                child.KC.viewmodel.mainclass("Grid--"+Grid.align());
             }


             resloop:for(var x=0;x<children[i].length;x++){
                var child = children[i][x];
                if(child.KC.locked()){
                  child.KC.width(child.KC.minwidth())._update();
                }
                else if(child.KC.col() !== 0 && child.KC.clearfloat()){
                  child.KC.width(Grid.width())._update();
                }
                else if(child.KC.col() === 0 && getColTotals(children[i]) === 1){
                  child.KC.width(Grid.width())._update();
                }
                else{
                  function getNextWidth(){
                    var colTotal = getColTotals(children[i]),
                        offsets = getOffset(children[i]),
                        nextWidth = function(c){
                          return (~~( ((Grid.width()/getColTotals(children[i])) + c.KC.offsetx()) - ((getOffset(children[i])-c.KC.offsetx())/ (getColTotals(children[i])-1)) ))
                        },
                        soonest = getSoonestClearFloat(children[i]);
                    if(colTotal === 1){
                      return (!child.KC.locked() ? Grid.width() : child.KC.minwidth());
                    }
                    if(nextWidth(child) < child.KC.minwidth()){
                      var nonclear = getLastNonClearFloat(children[i]);
                      nonclear.KC.clearfloat(true).width((!nonclear.KC.locked() ? Grid.width() : nonclear.KC.minwidth()))._update();
                      return getNextWidth();
                    }
                    if(soonest && Grid.width() >= ((checkRecallWidths(children[i]) + soonest.KC.minwidth()) + (offsets+soonest.KC.offsetx())) ){
                      soonest.KC.clearfloat(false)._update();
                      soonest.KC.width(nextWidth(soonest))._update();
                      return getNextWidth();
                    }
                    return nextWidth(child);
                  }
                  child.KC.width(getNextWidth())._update();
                }
              }
           }
           else{
             children[i][0].KC.width(Grid.width()+getFullOffset(children[i][0]))._update();
           }
          }
        }

        function alignGrids(){

          for(var i=0;i<children.length;i++){
              if(Grid.align() === 'middle' && children[i].length > 1 && children[i][0]){

                var margins = ((Grid.width()-getWidths(children[i]))/2),
                    middle = (Grid.width()/2);

                children[i][0].KC.marginleft(-Math.floor(middle-margins))._update();

                for(var x=1;x<children[i].length;x++){
                  if(children[i][x].KC.clearfloat()){
                    children[i][x].KC.marginleft(-Math.floor(children[i][x].KC.width()/2))._update();
                  }
                  else{
                    var prevMargin = parseInt(children[i][(x-1)].style.marginleft,10),
                        prevWidth = children[i][(x-1)].KC.width();
                    if((prevMargin+prevWidth) < 0){
                      children[i][x].KC.marginleft(-Math.floor(prevMargin+prevWidth))._update();
                    }
                    else{
                      children[i][x].KC.marginleft(0)._update();
                    }
                  }
                }
              }
              else if(Grid.align() === 'middle'){
                if(children[i][0]) children[i][0].KC.marginleft(-Math.floor(children[i][0].KC.width()/2))._update();
              }
          }
        }

        if(children && children.length > 0 && children.length === children.filter(function(k){return (k.KC)}).length){
          children = splitGrids(children);
          resizeGrids();
          alignGrids();
        }
      }

      window.addEventListener('resize',Grid.resize.bind({fromWindow:true}));

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
