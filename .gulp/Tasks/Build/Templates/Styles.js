var includeCSS = (function(){
    var _styleTemplate = '<style id="$Type-Styles" media="screen" type="text/css"></style>',
        _styleNode = document.getElementById('$Type-Styles');
    if(!_styleNode){
        var frag = document.createDocumentFragment();
        frag.appendChild(_styleTemplate);
        document.head.appendChild(frag);
        _styleNode = document.getElementById('$Type-Styles');
    }

    if(_styleNode.textContent.indexOf('$Component') < 0){
        _styleNode.textContent += '\r\n@import "$Types/$Name/$Name.css";';
    }
    return _styleNode;
}());
