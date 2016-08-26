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
        name:'minwidth',
        value:275
      })
      .add({
        type:'number',
        name:'offsetx',
        value:0,
        preprocess:function(v){
          if((Grid.minwidth()+v < 0)){
            v = Grid.minWidth();
            Grid.minwidth(0);
          }
          else{
            Grid.minwidth(Grid.minwidth()+v);
          }
          return v;
        }
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
        name:'marginleft',
        value:0
      })
      .add({
        type:'boolean',
        name:'locked',
        value:false
      })

      Grid.resize = function(e){

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

        function getColTotals(grids){
          return getColGrids(grids).length;
        }

        function getColGrids(grids){
          return grids.filter(function(k){
            return (k.KC.col() === 0 || !k.KC.clearfloat());
          })
        }

        function getMin(grids,colGrids){
          return (colGrids || getColGrids(grids)).reduce(function(t,k){
            return t+k.KC.minwidth();
          },0);
        }

        function getSplitWidth(grids,totals){ //divide
          return Grid.width()/(totals || getColTotals(grids));
        }

        function setOffsets(grids,totals){
          var splitWidths = getSplitWidth(grids,totals),
              mod = 0;
          for(var x=0;x<(totals || getColTotals(grids));x++){
            mod += (splitWidths%1);
            var s = (~~splitWidths)+(~~mod);
            mod = mod-(~~mod);
            grids[x].KC.width(s+grids[x].KC.offsetx());
          }
          return grids;
        }

        function getWidths(grids,colGrids){
          return (colGrids || getColGrids(grids)).reduce(function(t,k){
            return t+k.KC.width();
          },0);
        }

        function getSplitChange(grids,totals,colGrids){ //divide
          return ((getWidths(grids,colGrids)-Grid.width())/(totals || getColTotals(grids)));
        }

        function setSplitChange(grids,totals,colGrids){
          var splitChange = getSplitChange(grids,totals,colGrids),
              mod = 0;
          for(var x=0;x<(totals || getColTotals(grids));x++){
            mod += (splitChange%1);
            var s = (~~splitChange)+(~~mod);
            mod = mod-(~~mod);
            grids[x].KC.width((grids[x].KC.width()-s));
          }
          return grids;
        }

        function checkSize(grids,colGrids){
          return (getMin(grids,colGrids) < Grid.width());
        }

        function getSoonestClearFloat(grids){
          for(var x=1;x<grids.length;x++){
            if(grids[x].KC.clearfloat()){
              return grids[x];
            }
          }
          return null;
        }

        function getLastNonClearFloat(grids){
          for(var x=1;x<grids.length;x++){
            if(grids[x].KC.clearfloat()){
              return grids[(x-1)];
            }
          }
          return grids[(grids.length-1)];
        }

        /* Grids control their child grids, if no parent grid exists they also control themselves, ie topmost grid */
        var children = Array.prototype.slice.call(Grid.node.querySelector('.Grid').children).filter(function(k){
              return (k.nodeName.toLowerCase() === 'grid')
            });

        if(Grid.node.parentElement.className.indexOf('Grid') < 0){
          Grid.width(Grid.node.parentElement.clientWidth+Grid.offsetx()).clearfloat(true);
          Grid.viewmodel.mainclass("Grid--left");
        }

        function alignGrids(){

          for(var i=0;i<children.length;i++){
              if(Grid.align() === 'middle' && children[i].length > 1 && children[i][0]){

                var margins = ((Grid.width()-getWidths(children[i]))/2),
                    middle = (Grid.width()/2);

                children[i][0].KC.marginleft(-Math.floor(middle-margins));

                for(var x=1;x<children[i].length;x++){
                  if(children[i][x].KC.clearfloat()){
                    children[i][x].KC.marginleft(-Math.floor(children[i][x].KC.width()/2));
                  }
                  else{
                    var prevMargin = parseInt(children[i][(x-1)].style.marginleft,10),
                        prevWidth = children[i][(x-1)].KC.width();
                    if((prevMargin+prevWidth) < 0){
                      children[i][x].KC.marginleft(-Math.floor(prevMargin+prevWidth));
                    }
                    else{
                      children[i][x].KC.marginleft(0);
                    }
                  }
                }
              }
              else if(Grid.align() === 'middle'){
                if(children[i][0]) children[i][0].KC.marginleft(-Math.floor(children[i][0].KC.width()/2));
              }
          }
        }

        if(children && children.length > 0 && children.length === children.filter(function(k){return (k.KC)}).length){
          children = splitGrids(children);

          for(var i=0;i<children.length;i++){
           if(children[i].length > 1){
             children[i][0].KC.clearfloat(true);

             for(var x=0;x<children[i].length;x++){
                var child = children[i][x];
                child.KC.viewmodel.mainclass("Grid--"+Grid.align());
               if(child.KC.row() !== 0 && child.KC.clearfloat()){
                 child.KC.width(Grid.width());
               }
             }

             var colGrids = getColGrids(children[i]);

             if(!checkSize(children[i],colGrids)){
               var nonclear = getLastNonClearFloat(children[i]);
               nonclear.KC.clearfloat(true).width(Grid.width());
             }
             else{
               var soonest = getSoonestClearFloat(children[i]);
               if(soonest && ((getMin(children[i],colGrids)+soonest.KC.minwidth()) < Grid.width())){
                 soonest.KC.clearfloat(false);
               }
             }
             colGrids = getColGrids(children[i]);
             setOffsets(children[i],colGrids.length);
             setSplitChange(children[i],colGrids.length,colGrids);
           }
           else{
             children[i][0].KC.width(Grid.width());
           }
          }

          alignGrids();
        }
      }

      window.addEventListener('resize',Grid.resize.bind({fromWindow:true}));

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
