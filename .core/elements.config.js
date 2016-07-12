var element_routes = {
  Components:{
    progressbar:'./Components/ProgressBar/ProgressBar'
  },
  Sections:{
    upload:'./Sections/Upload/Upload'
  },
  Pages:{

  }
}

function parseQuery(qstr) {
    var query = {},
        a = qstr.substr(1).split('&');

    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}
