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
      action:'File'
    },
    File: {
      cmd: {
        short: "-f",
        long: "--file"
      },
      prompt: {
        type: "list",
        message: "Which file would You like to document?",
        choices: function(values){
            return fs.readdirSync('./src/'+values.Type+'/'+values.Element).filter(function(k,i){
              return (['dev','qa','stage','prod','Readme.md'].indexOf(k) < 0);
            });
        }
      },
      action:'Regex'
    },
    Regex: {
      prompt:{
        type:'list',
        message: 'Which Regex would You like to appy?',
        choices:function(values){
          var config = global.gulp.config.Tasks.Docr;
          return Object.keys(config.regex).map(function(k,i){
            return k+": "+(typeof config.regex[k] === 'function' ? config.regex[k](values) : config.regex[k]).toString();
          })
        }
      },
      action:function(v,values){
        var reg = v.split(': ')[1],
            type = (reg.substring(reg.length-1,reg.length) !== '/' ? reg.substring(reg.length-1,reg.length) : null);
        values.Regex = new RegExp(reg.substring(1,(type ? reg.length-2 : reg.length-1)),(type ? type : ''));
        return 'Filtered';
      }
    },
    Filtered: {
      prompt: {
        type:'list',
        message:'Which would You like to document?',
        choices:function(values){
          var choices = (fs.readFileSync('./src/'+values.Type+'/'+values.Element+'/'+values.File,'utf8')).match(values.Regex).map(function(k,i){
              return k.replace(values.Regex,'$2');
          }).filter(function(k,i){
            if(values.Filtered !== undefined){
              return (values.Filtered.indexOf(k) < 0);
            }
            return true;
          });
          choices.push('none');
          return choices;
        }
      },
      action:function(v){
        if(v === 'none'){
          return 'end';
        }
        return 'Description';
      },
      store:'array'
    },
    Description:{
      prompt: {
        type:'input',
        message:'Please write a brief description'
      },
      action:'Filtered',
      store:'array'
    }
  },
  regex:{
    properties:/(this\.)(.*?)(\s)?(=)/g,
    prototypes:/(prototype\.)(.*?)(\s)?(=)/g,
    methods:function(values){
      return new RegExp('(' + values.Element + '\.)(.*?)(=)','g');
    }
  }
}
