function Grid(){

  function traverseToClosestSizedElement(el){
    for(var x=0;x<el.children.length;x++){
      if(el.children[x].clientHeight > 0 && el.children[x].clientWidth > 0){
        return {height:el.children[x].clientHeight,width:el.children[x].clientWidth};
      }
    }
    var childHeights = [];
    for(var x=0;x<el.children.length;x++){
     var traversed = traverseToClosestSizedElement(el.children[x]);
      if(traversed.height > 0 && traversed.width > 0){
        childHeights.push(traversed);
      }
    }
    return childHeights.reduce(function(s,k){
      s.height = (k.height > s.height ? k.height : s.height);
      s.width = (k.width > s.width ? k.width : s.width);
      return s;
    },{height:0,width:0})
  }

  function adjustColumnsHeight(){
    document.querySelectorAll('.column').forEach(function(el){
      el.style.height = traverseToClosestSizedElement(el).height+"px";
    })
  }

  return {
    traverseToClosestSizedElement : traverseToClosestSizedElement,
    adjustColumnsHeight : adjustColumnsHeight
  }


};
