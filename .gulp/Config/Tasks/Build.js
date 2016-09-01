var fs = require('fs')

module.exports = {
  commands:{
    Type:{
      cmd:{
        short:'-t',
        long:'--type'
      },
      prompt:{
        type:'list',
        message:'What type of template would You like to build?',
        choices:function(){
          return fs.readdirSync('./.gulp/Tasks/Create/Templates').concat(['.core']);
        }
      },
      action:function(v){
        if(v === '.core'){
          return 'SubTask';
        }
        return 'Name';
      }
    },
    Name:{
      prompt:{
        type:'list',
        message:'Which element would you like to build?',
        choices:function(values){
          return fs.readdirSync('./src/'+values.Type);
        }
      },
      action:'SubTask'
    },
    SubTask:{
      prompt:{
        type:'list',
        message:'Which sub task do you want to build?',
        choices:function(values){
          return Object.keys(global.gulp.config.Tasks.Build.subtasks).filter(function(k){
            if(values['Type'] === '.core'){
              return (k === '.core');
            }
            return (k !== '.core');
          });
        }
      },
      action:'Environment'
    },
    Environment:{
      cmd:{
        short:'-e',
        long:'--env'
      },
      prompt:{
        type:'list',
        message:'Which sub task rule would You like to build for?',
        choices:function(values){
          return (global.gulp.config.Tasks.Build.subtasks[values.SubTask]);
        }
      },
      action:'end'
    }
  },
  subtasks:fs.readdirSync('./.gulp/Tasks/Build/Subtasks').reduce(function(obj,t){
    if(t === 'web_elements'){
      obj[t] = ['dev','qa','stage','prod'];
      return obj;
    }
    obj[t] = fs.readdirSync('./.gulp/Tasks/Build/Subtasks/'+t);
    return obj;
  },{})
}
