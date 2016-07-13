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
          return fs.readdirSync('./.gulp/Tasks/Create/Templates');
        }
      },
      action:'Name'
    },
    Name:{
      prompt:{
        type:'list',
        message:'Which element would you like to build?',
        choices:function(values){
          return fs.readdirSync('./Src/'+values.Type);
        }
      },
      action:'SubTask'
    },
    SubTask:{
      prompt:{
        type:'list',
        message:'Which sub task do you want to use?',
        choices:function(values){
          return Object.keys(global.gulp.config.Tasks.Build.subtasks);
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
  subtasks:{
    web_elements:['dev','qa','stage','prod']
  }
}
