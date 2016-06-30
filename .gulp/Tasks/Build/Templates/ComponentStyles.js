var includeCSS = (function(){
    var _styleTemplate = '<style id="ComponentStyles" media="screen" type="text/css"></style>',
        _styleNode = document.getElementById('ComponentStyles');
    if(!_styleNode){
        var frag = document.createDocumentFragment();
        frag.appendChild(_styleTemplate);
        document.head.appendChild(frag);
        _styleNode = document.getElementById('ComponentStyles');
    }

    if(_styleNode.textContent.indexOf('$Component') < 0){
        _styleNode.textContent += '\r\n@import "Components/$Component/$Component.css";';
    }
    return _styleNode;
}());
