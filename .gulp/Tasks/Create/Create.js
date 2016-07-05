var gulp = require('gulp')
  , file = require('gulp-file')
  , fs = require('fs')
  , base = require('./../../Base');

var config = global.gulp.config;

module.exports = function(){

  function Exists(res,key){
    if(res.Type !== undefined && key === 'Name'){
      try
      {
        var exists = fs.statSync('./' + config[res.Type].base + '/' + res.Name);
        if(exists){
          console.error('\033[31mThere is already something by the name: \033[37m',res.Name,' in ',config[res.Type].base);
          process.exit(1);
        }
      }
      catch(e)
      {
        if(e.code !== 'ENOENT'){
          console.error(e);
          process.exit(1);
        }
      }
    }
  }

  function Command(res){
    fs.readdirSync('./.gulp/Tasks/Create/Templates/'+res.Type).forEach(function(f,i){
      var template = fs.readFileSync('./.gulp/Tasks/Create/Templates/' + res.Type + '/'+f,'utf8'),
          resKeys = Object.keys(res);

      for(var x=0;x<resKeys.length;x++){
        var k = resKeys[x],
            reg = new RegExp("(\\$" + k + ")",'g');

        template = template.replace(reg,res[k]);
        f = f.replace(reg,res[k]);
      }
      file('./'+f,template,{src:true})
      .pipe(gulp.dest('./'+ config[res.Type].base + '/' + res.Name));
    });
  };

  return base.task('Create')
  .filter(Exists)
  .command(Command)
  .call();
};
