var gulp = require('gulp')
  , prompt = require('gulp-prompt')
  , file = require('gulp-file')
  , fs = require('fs');

var config = global.gulp.config;

module.exports = function(){

  var _component;

  return gulp.src('*')
  .pipe(prompt.prompt({
    type: 'input',
    name: 'component',
    message: 'What would You like to name this component?'
  },Component))
  .pipe(prompt.prompt({
    type: 'input',
    name: 'description',
    message: 'Please write a short description of the component'
  },Description))

  function Component(res){
    try
    {
      var exists = fs.statSync('./' + config.components.base + '/' + res.component + '/' + res.component + '.js');
      if(exists){
        console.error('\033[31mThere is already a component by the name:\033[37m ',res.component);
        process.exit(1);
      }
    }
    catch(e)
    {
      if(e.code === 'ENOENT'){
        _component = res.component;
      }
      else{
        console.error(e);
        process.exit(1);
      }
    }
  }

  function Description(res) {
    res.component = _component;
    Command(res);
  }

  function Command(res){
    fs.readdirSync('./' + config.tasks.Create.base + '/Templates/Component').forEach(function(k,i){
      var template = fs.readFileSync('./' + config.tasks.Create.base + '/Templates/Component/'+k,'utf8')
      .replace(/(Component)/g,res.component)
      .replace(/(Description)/g,res.description),
          ext = k.split('.')[(k.split('.').length-1)];

      file('./'+res.component+'.' + ext,template,{src:true})
      .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));
    });
  };
};
