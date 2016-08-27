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
        checkAgainst:['left','right']
      })
      .add({
        type:'number',
        name:'minwidth',
        value:275
      })
      .add({
        type:'number',
        name:'min',
        value:275
      })
      .add({
        type:'number',
        name:'offsetx',
        value:0,
        preprocess:function(v){
          var min = Grid.minwidth();
          Grid.min(Math.max(0,(min+v)));
          if(((min+v) < 0)){
            console.warn('Warning!, Your grid offset of',v,' is less than the current min-width of ',Grid.minwidth(),' Your grids will behave irratically if this is the case, please either add minwidth="'+(v*-1)+'" or decrease your offset');
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
        name:'autowidth',
        value:0
      })
      .add({
        type:'boolean',
        name:'locked',
        value:false,
        preprocess:function(v){
          /*if(Grid.width() === 0){
            Grid.width((Grid.minwidth()+Grid.offsetx()));
          }*/
          return v;
        }
      })
      .add({
        type:'number',
        name:'height',
        value:100
      })
      /* The formula
         1. get all rows min widths: getMin offsets already calculated by preprocessor
         2. get split widths: getSplit
         3. get current widths - offsets: getWidths
         4. get varied difference widths: getdif
         5. compare, knock off if greater, rinse repeat
      */


      Grid.resize = function(e){
        if(!Grid.node.parentElement){
          console.log(Grid.node.innerHTML);
          window.removeEventListener('resize',Grid.resize);
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

        function splitfloats(row)
        {
          var arr = [];
          for(var x=1;x<row.length;x++){
            if(row[x].KC.clearfloat()){
              var last = (!arr.length ? 0 : (arr.reduce(function(l,k){return l+k.length;},0)));
              arr.push(row.slice(last,x));
            }
          }
          if(arr.length < 1){
            arr.push(row);
          }
          else{
            loop:for(var x=(row.length-1);x>0;x--){
              if(row[x].KC.clearfloat()){
                arr.push(row.slice(x,row.length));
                break loop;
              }
            }
          }
          return arr;
        }

        /* 1st Step */
        function getMin(grids){
          return grids.reduce(function(t,k){
            return (t+(k.KC.locked() ? (k.KC.width()) : (k.KC.minwidth()+k.KC.offsetx())));
          },0);
        }

        /* 2nd + 3rd Step */
        function getWidths(grids,lockedTotal){
          var split = ((Grid.autowidth()-lockedTotal)/grids.length),
              mod = 0,
              numbers = grids.map(function(k){
                if(grids.length === 1){
                  return split;
                }
                else{
                  return Math.max((k.KC.minwidth()+k.KC.offsetx()),(split+k.KC.offsetx()));
                }
              }),
              total = numbers.reduce(function(t,k){
                return t+k;
              },0);

          return {numbers:numbers,total:total};
        }

        /* 2nd + 3rd + 4th Step */
        function getVaried(grids,lockedTotal){
          var trueWidths = getWidths(grids,lockedTotal),
              dif = ((trueWidths.total-(Grid.autowidth()-lockedTotal))/grids.length),
              mod = 0,
              newWidths = trueWidths.numbers.map(function(k){
                return (Math.max(0,(k-dif)));
              }),
              total = newWidths.reduce(function(t,k){
                return t+k;
              },0);
          return {newWidths:newWidths,total:total};
        }

        /* 2nd + 3rd + 4th + 5th Step */
        function compare(grids){
          var min = getMin(grids),
              lockedTotal = grids.reduce(function(t,k){
                return t+(k.KC.locked() ? k.KC.width() : 0);
              },0),
              nonLockedgrids = grids.filter(function(k){
                return (!k.KC.locked());
              }),
              variedWidths = getVaried(nonLockedgrids,lockedTotal);
          return {min:((variedWidths.total+lockedTotal) > min),single:(grids.length === 1),widths:variedWidths.newWidths};
        }

        /* iterator step, keeps tracks of placement and arrays to check */
        function check(row){
          var rows = splitfloats(row);
          loop:for(var x=0;x<rows.length;x++){
            var matched = compare(rows[x]);
            if(!matched.min && !matched.single){
              if(rows[x+1]){
                for(var i=0;i<rows[x+1].length;i++){
                  rows[x+1][i].KC.clearfloat(false);
                }
              }
              rows[x][rows[x].length-1].KC.clearfloat(true);
              return check(row);
            }
            else if(rows[x+1] && compare(rows[x].concat([rows[x+1][0]])).min){
              if(rows[x+1]){
                for(var i=0;i<rows[x+1].length;i++){
                  rows[x+1][i].KC.clearfloat(false);
                }
              }
              return check(row);
            }
            var mod = 0;
            rows[x].forEach(function(k,i){
              if(!k.KC.locked()){
                var w = matched.widths[0];
                mod += (w%1);
                var s = (~~w)+(~~mod);
                mod = mod-(~~mod);
                k.KC.autowidth(s);
                matched.widths.splice(0,1);
              }
              else{
                k.KC.autowidth(k.KC.width());
              }
            });
          }
        }

        /* Grids control their child grids, if no parent grid exists they also control themselves, ie topmost grid */
        var children = Array.prototype.slice.call(Grid.node.querySelector('.Grid').children).filter(function(k){
              return (k.nodeName.toLowerCase() === 'grid')
            });

        if(Grid.node.parentElement.className.indexOf('Grid') < 0){
          Grid.autowidth(Grid.node.parentElement.clientWidth+Grid.offsetx()).clearfloat(true);
          Grid.viewmodel.mainclass("Grid--left");
          if(Grid.node.parentElement.className.indexOf('page_holder') > -1){
            Grid.height(window.innerHeight);
          }
          else{
            Grid.height(Grid.node.parentElement.clientHeight);
          }
        }

        if(children && children.length > 0){
          children.forEach(function(k){
            if(k.KC && k.KC.viewmodel){
              k.KC.viewmodel.mainclass('Grid--'+Grid.align());
            }
          });
        }
        if(children && children.length > 0 && children.length === children.filter(function(k){return (k.KC)}).length){
          children = splitGrids(children);

          for(var i=0;i<children.length;i++){
           if(children[i].length > 1){
             children[i][0].KC.clearfloat(true);
             check(children[i]);

           }
           else{
             children[i][0].KC.autowidth(Grid.autowidth());
           }
          }
        }
        Grid.updateHeight();
      }

      Grid.updateHeight = function(){
        var gridNode = Grid.node.querySelector('.Grid');
        var all =  Array.prototype.slice.call(gridNode.querySelectorAll('*'))
        .filter(function(k){
          return (!(k instanceof HTMLUnknownElement));
        }),
        tallest = 0;

        function getRelationTop(el){
          return (el.getBoundingClientRect().top-gridNode.getBoundingClientRect().top);
        }

        if(all.length === 0){
          var styles = getComputedStyle(gridNode);
          tallest = (parseInt(styles.getPropertyValue('line-height')));
        }

        for(var x=0;x<all.length;x++){
          var styles = getComputedStyle(all[x],null);
          if(styles.getPropertyValue('display') === 'none'){
            pos = 0;
          }
          else{
            if(all[x].children.length === 0 || all[x].clientHeight === 0){
              pos = getRelationTop(all[x])+(parseInt(styles.getPropertyValue('line-height')))+parseInt(styles.getPropertyValue('margin-bottom'));
            }
            else{
              pos = getRelationTop(all[x])+all[x].clientHeight+parseInt(styles.getPropertyValue('margin-bottom'));
            }
          }
          tallest = (pos > tallest ? pos : tallest);
        }
        if(Grid.node.parentElement.className.indexOf('Grid') < 0){
          if(Grid.node.parentElement.className.indexOf('page_holder') > -1){
            Grid.height(window.innerHeight);
          }
          else{
            Grid.height(Grid.node.parentElement.clientHeight);
          }
        }
        else{
          Grid.height(tallest);
        }
      }

      window.addEventListener('resize',Grid.resize.bind({fromWindow:true}));

      return Grid;
	}
    blueprint.register_Grid(CreateGrid,viewmodel,template,css);
	return CreateGrid;
});
