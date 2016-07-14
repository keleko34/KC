var includeCSS = (function(){
    var _styleNode = document.getElementById('$Type-Styles');

    if(!_styleNode){
        _styleNode = document.createElement('style');
        _styleNode.setAttribute('id','$Type-Styles');
        _styleNode.setAttribute('media','screen');
        _styleNode.setAttribute('type','text/css');
        document.head.appendChild(_styleNode);
        _styleNode = document.getElementById('$Type-Styles');
    }

    if(_styleNode.textContent.indexOf('$Name') < 0){
        _styleNode.textContent += '\r\n@import "/src/$Type/$Name/$Name.css";';
    }
    return _styleNode;
}());
