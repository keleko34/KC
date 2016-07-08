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
        choices:['Component','Section','Page']
      }
    },
    Name:{
      prompt:{
        type:'list',
        message:'Which element would you like to build?',
        choices:function(){
          return fs.readdirSync('./Components');
        }
      }
    },
    Environment:{
      cmd:{
        short:'-e',
        long:'--env'
      },
      prompt:{
        type:'list',
        message:'Which environment would You like to build for?',
        choices:['dev','qa','stage','prod']
      }
    }
  }
}
