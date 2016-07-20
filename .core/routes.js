define([],function(){
  return {
    "page_routes":{
      "Header":[
        { "url": "", "params": { "page": "_blank"}},
        { "url": "homepage", "params": { "page": "_test"}}
      ],
      "Content":[
        { "url": "",    "params": { "page": "_test" } }
      ],
      "Footer":[
        { "url":"", "params": { "page": "_blank"}}
      ]
    },

    /* Sails we will change this to backend routing */
    "element_routes":{
      "Components":{
        "progressbar":"./src/Components/ProgressBar/ProgressBar",
        "photopost":"./src/Components/PhotoPost/PhotoPost"
      },
      "Sections":{
        "upload":"./src/Sections/Upload/Upload"
      },
      "Pages":{
        "photoupload":"./src/Pages/PhotoUpload/PhotoUpload"
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
