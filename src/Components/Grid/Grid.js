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
          Grid.width(Grid.node.parentElement.clientWidth+Grid.offsetX())
          .height((Grid.height() === 0 ? (Grid.node.parentElement.clientHeight+Grid.offsetY()) : Grid.height()+Grid.offsetY()));
          _initial = true;
          Grid.resize();
          if(getParentGrid(Grid.node)){
            getParentGrid(Grid.node).KC.resize();
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
      .add({
        type:'number',
        name:'marginLeft',
        value:0
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

      function getParentGrid(node){
        node = node.parentElement;
        while(node && node.nodeName.toLowerCase() !== 'grid'){
          node = node.parentElement;
        }
        return (node && node.nodeName.toLowerCase() === 'grid' ? node : null);
      }

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

        function checkRecallWidths(grids){
          var foundLast = false;
          return grids.filter(function(k,i){
            if(foundLast) return false;
            if(i !== 0 && k && k.KC.clearfloat()){
              foundLast = true;
            }
            return ((i === 0 || (k && k.KC.clearfloat())));
          }).reduce(function(o,k){
            return o+(k ? k.KC.minWidth() : 0);
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

        function getWidths(grids){
          return grids.filter(function(k,i){
            return ((i === 0 || !k.KC.clearfloat()));
          }).reduce(function(o,k){
            return o+k.KC.width();
          },0);
        }

        /* Grids control their child grids, if no parent grid exists they also control themselves, ie topmost grid */
        var children = splitGrids(Array.prototype.slice.call(Grid.node.querySelector('.Grid').children).filter(function(k){
              return (k.nodeName.toLowerCase() === 'grid')
            })),
            parent = getParentGrid(Grid.node);

        if(!parent){
          Grid.width(Grid.node.parentElement.clientWidth+Grid.offsetX()).clearfloat(true).call();
          Grid.viewmodel.mainclass("Grid--middle");
          Grid.marginLeft(-Math.floor(Grid.width()/2));
        }

        function resizeGrids(){

          for(var i=0;i<children.length;i++){
            if(children[i].length > 1 && children[i][0]){
              var colTotals = children[i].length;

              if(children[i][0].KC.width() <= children[i][0].KC.minWidth()){
                children[i][(children[i].length-1)].KC.clearfloat(true).call();
              }

              if(checkRecallWidths(children[i]) < Grid.width() && getSoonestClearFloat(children[i])){
                getSoonestClearFloat(children[i]).KC.clearfloat(false).call();
              }

              colTotals = children[i].filter(function(k){
                return (k.KC.col() === 0 || !k.KC.clearfloat());
              }).length

              function loopSet(){
                for(var x=0;x<children[i].length;x++){
                  if(children[i][x]){
                    if(children[i][x].KC.col() === 0){
                      children[i][x].KC.clearfloat(true).call();
                    }
                    if(x !== 0 && children[i][x].KC.clearfloat()){
                      children[i][x].KC.width(Math.floor(Grid.width()+children[i][x].KC.offsetX())).call();
                    }
                    else if(x === 0 && children[i][(x+1)].KC.clearfloat()){
                      children[i][x].KC.width(Math.floor(Grid.width()+children[i][x].KC.offsetX())).call();
                    }
                    else{
                      children[i][x].KC.width(Math.floor(Grid.width()/colTotals+children[i][x].KC.offsetX())).call();
                    }
                  }
                }
              }

              loopSet();

            }
            else if(children[i][0]){
              children[i][0].KC.width(Math.floor(Grid.width()+children[i][0].KC.offsetX())).call();
            }
          }
        }

        function alignGrids(){

          for(var i=0;i<children.length;i++){
            for(var x=0;x<children[i].length;x++){
              if(children[i][x]) children[i][x].KC.viewmodel.mainclass("Grid--"+Grid.align());
            }

            if(Grid.align() === 'middle' && children[i].length > 1 && children[i][0]){

              var margins = ((Grid.width()-getWidths(children[i]))/2),
                  middle = (Grid.width()/2);

              children[i][0].KC.marginLeft(-Math.floor(middle-margins));

              for(var x=1;x<children[i].length;x++){
                if(children[i][x].KC.clearfloat()){
                  children[i][x].KC.marginLeft(-Math.floor(children[i][x].KC.width()/2));
                }
                else{
                  var prevMargin = parseInt(children[i][(x-1)].style.marginLeft,10),
                      prevWidth = children[i][(x-1)].KC.width();
                  if((prevMargin+prevWidth) < 0){
                    children[i][x].KC.marginLeft(-Math.floor(prevMargin+prevWidth));
                  }
                  else{
                    children[i][x].KC.marginLeft(0);
                  }
                }
              }
            }
            else if(Grid.align() === 'middle'){
              if(children[i][0]) children[i][0].KC.marginLeft(-Math.floor(children[i][0].KC.width()/2));
            }
          }
        }

        if(children && children.length > 0){
          resizeGrids();
          resizeGrids();
          alignGrids();
        }
      }

      window.addEventListener('resize',Grid.resize);

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
