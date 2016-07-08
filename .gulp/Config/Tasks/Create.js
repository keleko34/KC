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
            message:'What type of template would You like to create?',
            choices:function(){
              return fs.readdirSync('./.gulp/Tasks/Create/Templates');
            }
          },
          action:function(v){
            if(v === 'Section'){
              return 'AddComponent';
            }
            return 'Name';
          }
        },
        Add:{
          prompt:{
            type:'confirm',
            message:'Would You like to add a Component to this Section?'
          },
          action:function(v){
            if(v){
              return 'Components';
            }
            return 'Name';
          }
        },
        Components:{
          prompt:{
            type:'list',
            message:'Which Component would you like to add?',
            choices:function(){
              return fs.readdirSync('./Components');
            }
          },
          action:'Add',
          store:'array'
        },
        Name:{
          cmd:{
            short:'-n',
            long:'--name'
          },
          prompt:{
            type:'input',
            message:'What would You like to name this?'
          },
          action:'Description'
        },
        Description:{
          cmd:{
            short:'-d',
            long:'--desc'
          },
          prompt:{
            type:'input',
            message:'Please write a brief description of this element'
          },
          action:'Author'
        },
        Author:{
          cmd:{
            short:'-a',
            long:'--auth'
          },
          prompt:{
            type:'input',
            message:'Initial Author of this Element?'
          },
          action:'Run'
        }
      }
    }
