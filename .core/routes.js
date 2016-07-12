define([],function(){
  return {
    "page_routes":{
      "Header":[
        { "url": "", "params": { "page": "upload"}},
        { "url": "progressbar",    "params": { "page": "upload" } }
      ],
      "Content":[
        { "url": "",    "params": { "page": "upload" } },
        { "url": "progressbar",    "params": { "page": "upload" } }
      ],
      "Footer":[
        { "url":"", "params": { "page": "upload"}},
        { "url": "progressbar",    "params": { "page": "upload" } }
      ]
    },

    /* Sails we will change this to backend routing */
    "element_routes":{
      "Components":{
        "progressbar":"./Components/ProgressBar/ProgressBar"
      },
      "Sections":{
        "upload":"./Sections/Upload/Upload"
      },
      "Pages":{

      }
    },
    parseQuery:function(qstr){
      var query = {},
          a = qstr.substr(1).split('&');

      for (var i = 0; i < a.length; i++) {
          var b = a[i].split('=');
          query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
      }
      return query;
    }
  }
})
