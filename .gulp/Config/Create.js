module.exports = {
      base: '.gulp/Create',
      commands:{
        Type:{
          cmd:{
            short:'-t',
            long:'--type'
          },
          prompt:{
            type:'list',
            message:'What type of template would You like to create?',
            choices:['Component','Section','Page']
          }
        },
        Name:{
          cmd:{
            short:'-n',
            long:'--name'
          },
          prompt:{
            type:'input',
            message:'What would You like to name this?'
          }
        },
        Description:{
          cmd:{
            short:'-d',
            long:'--desc'
          },
          prompt:{
            type:'input',
            message:'Please write a brief description of what this component does'
          }
        },
        Author:{
          cmd:{
            short:'-a',
            long:'--auth'
          },
          prompt:{
            type:'input',
            message:'Initial Author of this Component?'
          }
        }
      }
    }
