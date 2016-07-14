var fs = require('fs');

module.exports = {
  commands: {
    Type: {
      cmd: {
        short: "-t",
        long: "--type"
      },
      prompt: {
        type: "list",
        message: "What type of template would You like to document?",
        choices: function(){
          return fs.readdirSync('./src');
        }
      },
      action:'Element'
    },
    Element: {
      cmd: {
        short: "-e",
        long: "--element"
      },
      prompt: {
        type: "list",
        message: "Which element would you like to document?",
        choices: function(values){
          return fs.readdirSync('./src/'+values.Type);
        }
      },
      action:'Manual'
    },
    Manual: {
      cmd: {
        short: "-m",
        long: "--manual"
      },
      prompt: {
        type: "confirm",
        message: "Would You like to manually enter the descriptions now?"
      },
      action:function(v,values){
        if(v){
          return 'Description';
        }
        return 'end';
      }
    },
    Description:{
      prompt: {
        type:'input',
        message:'Please write a brief description',

      },
      action:function(){

      }
    }
  },
  regex:{
    properties:/(this\.)(.*?)(=)/g,
    prototypes:/(prototype\.)(.*?)(=)/g,
    methods:function(values){
      return new RegExp('(' + values.Element + '\.)(.*?)(=)','g');
    }
  }
}
