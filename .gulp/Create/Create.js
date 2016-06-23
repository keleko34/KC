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
    var jsFile = fs.readFileSync('./' + config.tasks.Create.base + '/Templates/Component/Component.js','utf8')
        .replace(/(Component)/g,res.component),

        vmFile = fs.readFileSync('./' + config.tasks.Create.base + '/Templates/Component/Component.vm.js','utf8')
        .replace(/(Component)/g,res.component),

        cssFile = fs.readFileSync('./' + config.tasks.Create.base + '/Templates/Component/Component.css','utf8')
        .replace(/(Component)/g,res.component),

        readmeFile = fs.readFileSync('./' + config.tasks.Create.base + '/Templates/Component/Component.md','utf8')
        .replace(/(Component)/g,res.component)
        .replace(/(Description)/g,res.description)

    file('./'+res.component+".js",jsFile,{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    file('./'+res.component+".vm.js",vmFile,{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    file('./'+res.component+".css",cssFile,{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    file('./'+res.component+".html","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    file('./README.md',readmeFile,{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    /* This stage we strip away require and inline the html and css and inline concat the viewmodel */
    file('./dev/'+res.component+".js","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    /* This stage we minify and have dev for easy debug testing */
    file('./qa/'+res.component+".js","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));
    file('./qa/'+res.component+".min.js","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    /* This stage is pure minified version for final check, auto documentation is made for methods and properties to fill */
    file('./stage/'+res.component+".min.js","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));

    /* This stage is the final minified product, Hooray! */
    file('./prod/'+res.component+".min.js","",{src:true})
    .pipe(gulp.dest('./'+ config.components.base + '/' + res.component));
  };
};
