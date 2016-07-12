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
          return fs.readdirSync('./'+values.Type);
        }
      },
      action:'Environments'
    },
    Environment:{
      cmd:{
        short:'-e',
        long:'--env'
      },
      prompt:{
        type:'list',
        message:'Which environment would You like to build for?',
        choices:function(values){
          return fs.readdirSync('./.gulp/Tasks/Build/Subtasks');
        }
      },
      action:'end'
    }
  }
}
