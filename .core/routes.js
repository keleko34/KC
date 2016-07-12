define([],function(){
  return {
    "page_routes":{
      "Header":[
        { "url": "", "params": { "page": "photoupload"}},
        { "url": "progressbar",    "params": { "page": "progressbar" } }
      ],
      "Content":[
        { "url": "",    "params": { "page": "photoupload" } },
        { "url": "progressbar",    "params": { "page": "progressbar" } }
      ],
      "Footer":[
        { "url":"", "params": { "page": "photoupload"}},
        { "url": "progressbar",    "params": { "page": "progressbar" } }
      ]
    },

    /* Sails we will change this to backend routing */
    "element_routes":{
      "Components":{
        "progressbar":"./Src/Components/ProgressBar/ProgressBar"
      },
      "Sections":{
        "upload":"./Src/Sections/Upload/Upload"
      },
      "Pages":{
        "photoupload":"./Src/Pages/PhotoUpload/PhotoUpload"
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
